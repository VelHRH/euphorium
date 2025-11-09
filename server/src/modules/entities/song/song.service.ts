import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateSongInput,
  CreateSongOutput,
  DeleteSongInput,
  DeleteSongOutput,
  GetSongInput,
  GetSongOutput,
} from 'shared';
import { Repository } from 'typeorm';

import { SongEntity } from './song.entity';

import { BaseException, NotFoundException } from '$exceptions';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  async list(): Promise<SongEntity[]> {
    return this.songRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async get(
    input: GetSongInput,
  ): Promise<Either<BaseException, GetSongOutput>> {
    const song = await this.songRepository.findOne({
      where: { name: input.name },
    });

    if (!song) {
      return left(new NotFoundException());
    }

    return right({ name: song.name });
  }

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

  async create(
    input: CreateSongInput,
  ): Promise<Either<BaseException, CreateSongOutput>> {
    try {
      const song = this.songRepository.create(input);

      const savedSong = await this.songRepository.save(song);

      return right({
        id: savedSong.id,
        name: savedSong.name,
        artists: [], // toDO normal artist creation implementation
        youtubeUrls: savedSong.youtubeUrls,
        album: savedSong.album,
        postedAt: savedSong.postedAt,
        createdAt: savedSong.createdAt,
        updatedAt: savedSong.updatedAt,
      });
    } catch (error) {
      console.error(error);

      return left(new BaseException('Failed to create song'));
    }
  }

  async delete(
    input: DeleteSongInput,
  ): Promise<Either<BaseException, DeleteSongOutput>> {
    const song = await this.songRepository.findOne({
      where: { id: input.id },
    });

    if (!song) {
      return left(new NotFoundException());
    }

    try {
      await this.songRepository.remove(song);

      return right({ success: true, id: input.id });
    } catch (error) {
      return left(new BaseException('Failed to delete song'));
    }
  }
}
