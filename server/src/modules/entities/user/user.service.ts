import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateUserInput,
  CreateUserOutput,
  GetUserInput,
  GetUserOutput,
  ListUsersOutput,
  UpdateUserInput,
  UpdateUserOutput,
  User,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

import { Config } from '$config';
import { BadRequestException, NotFoundException } from '$exceptions';
import { UserExceptionMessage } from '$exceptions/constants';
import { CryptoService } from '$modules/crypto/crypto.service';

@Injectable()
export class UserService {
  private readonly salt: number;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.salt = this.configService.getOrThrow('jwt.salt', { infer: true });
  }

  async findOne(
    where: FindOptionsWhere<UserEntity>,
    select?: FindOptionsSelect<UserEntity>,
  ): Promise<Either<NotFoundException, User>> {
    const user = await this.userRepository.findOne({
      where,
      select,
    });

    if (!user) {
      return left(new NotFoundException(UserExceptionMessage.USER_NOT_FOUND));
    }

    return right(user);
  }

  get(input: GetUserInput): Promise<Either<NotFoundException, GetUserOutput>> {
    return this.findOne({ id: input.id });
  }

  async list(): Promise<ListUsersOutput> {
    const list = await this.userRepository.find();

    return { list };
  }

  async create(
    input: CreateUserInput,
  ): Promise<Either<BadRequestException, CreateUserOutput>> {
    const rawPassword = input.password;

    const password =
      rawPassword !== undefined ? await this.hashPassword(rawPassword) : undefined;

    try {
      const savedUser = await this.userRepository.save({
        ...input,
        password,
      });

      return right(savedUser);
    } catch {
      return left(
        new BadRequestException(UserExceptionMessage.CANNOT_CREATE_USER),
      );
    }
  }

  hashPassword(password: string): Promise<string> {
    return this.cryptoService.hashPassword(password, this.salt);
  }

  async getBySession(
    refreshToken: string,
  ): Promise<Either<NotFoundException, User>> {
    return this.findOne({ session: { refreshToken } });
  }

  async update(
    input: UpdateUserInput,
  ): Promise<Either<NotFoundException, UpdateUserOutput>> {
    const { id, ...restInput } = input;

    try {
      await this.userRepository.update({ id }, restInput);

      return await this.findOne({ id });
    } catch {
      return left(new NotFoundException(UserExceptionMessage.USER_NOT_FOUND));
    }
  }
}
