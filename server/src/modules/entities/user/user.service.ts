import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import { withValidation } from 'common/helpers';
import {
  CreateUserInput,
  createUserInputSchema,
  CreateUserOutput,
  GetUserInput,
  UpdateUserInput,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

import { Config } from '$config';
import { BadRequestException, BaseException } from '$exceptions';
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

  findOne(
    where: FindOptionsWhere<UserEntity>,
    select?: FindOptionsSelect<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where,
      select,
    });
  }

  strictFindOne(
    where: FindOptionsWhere<UserEntity>,
    select?: FindOptionsSelect<UserEntity>,
  ): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where,
      select,
    });
  }

  get(input: GetUserInput): Promise<UserEntity | null> {
    return this.findOne({ id: input.id });
  }

  list(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(
    input: CreateUserInput,
  ): Promise<Either<BaseException, CreateUserOutput>> {
    return withValidation(
      createUserInputSchema,
      input,
      async (validatedInput) => {
        try {
          const rawPassword = input.password;

          const password =
            rawPassword !== null ? await this.hashPassword(rawPassword) : null;

          const savedUser = await this.userRepository.save({
            ...validatedInput,
            password,
          });

          return right(savedUser);
        } catch {
          return left(new BadRequestException());
        }
      },
    );
  }

  hashPassword(password: string): Promise<string> {
    return this.cryptoService.hashPassword(password, this.salt);
  }

  async getBySession(refreshToken: string): Promise<UserEntity> {
    return this.strictFindOne({ session: { refreshToken } });
  }

  async update(input: UpdateUserInput): Promise<UserEntity | null> {
    const { id, ...restInput } = input;

    await this.userRepository.update({ id }, restInput);

    return this.findOne({ id });
  }
}
