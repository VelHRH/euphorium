import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import { GetSongInput, getSongInputSchema } from 'shared';
import { Repository } from 'typeorm';

import { SongEntity } from './song.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  async get(input: GetSongInput): Promise<Either<Error, { name: string }>> {
    // TODO: create wrapper for validation part, so all the services can use it
    try {
      const validatedInput = getSongInputSchema.parse(input);

      const song = await this.songRepository.findOne({
        where: { name: validatedInput.name },
      });

      if (!song) {
        return left(new NotFoundException());
      }

      return right({ name: song.name });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (error.errors) {
        const errors = error.errors as { message: string }[];

        const errorMessage = errors[0].message;

        return left(new Error(errorMessage));
      }

      return left(error);
    }
  }
}
