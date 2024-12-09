import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput, GetUserInput } from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

import { Config } from '$config';
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

  private findOne(
    where: FindOptionsWhere<UserEntity>,
    select?: FindOptionsSelect<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where,
      select,
    });
  }

  get(input: GetUserInput): Promise<UserEntity | null> {
    return this.findOne({ id: input.id });
  }

  async create(input: CreateUserInput): Promise<UserEntity> {
    const password = await this.cryptoService.hashPassword(
      input.password,
      this.salt,
    );

    return this.userRepository.save({ ...input, password });
  }
}
