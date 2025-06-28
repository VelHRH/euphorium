import { ValidationError } from '@nestjs/apollo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import { GetSongInput, getSongInputSchema, GetSongOutput } from 'shared';
import { Repository } from 'typeorm';

import { SongEntity } from './song.entity';

import { withValidation } from '$helpers';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  get = (
    input: GetSongInput,
  ): Promise<Either<ValidationError | NotFoundException, GetSongOutput>> =>
    withValidation(getSongInputSchema, input, async (validatedInput) => {
      const song = await this.songRepository.findOne({
        where: { name: validatedInput.name },
      });

      if (!song) {
        return left(new NotFoundException());
      }

      return right({ name: song.name });
    });

  // get = (input: GetSongInput): Promise<Either<Error, GetSongOutput>> =>
  //   validateWithSchema(getSongInputSchema, input)
  //     .asyncChain(async (validatedInput) => {
  //       const song = await this.songRepository.findOne({
  //         where: { name: validatedInput.name },
  //       });

  //       if (!song) {
  //         return left(new NotFoundException());
  //       }

  //       return right({ name: song.name });
  //     });

  // async get(
  //   input: GetSongInput,
  // ): Promise<Either<NotFoundException | ValidationError, GetSongOutput>> {
  //   const validationResult = validateWithSchema(
  //     getSongInputSchema,
  //     input,
  //   );

  //   if (validationResult.isLeft()) {
  //     return validationResult;
  //   }

  //   const song = await this.songRepository.findOne({
  //     where: { name: validationResult.value.name },
  //   });

  //   if (!song) {
  //     return left(new NotFoundException());
  //   }

  //   return right({ name: song.name });
  // }
}
