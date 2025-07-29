import { Query, Resolver } from '@nestjs/graphql';
import {
  CreateSongInput,
  createSongInputSchema,
  CreateSongOutput,
  createSongOutputSchema,
  DeleteSongInput,
  deleteSongInputSchema,
  DeleteSongOutput,
  deleteSongOutputSchema,
  GetSongInput,
  getSongInputSchema,
  GetSongOutput,
  getSongOutputSchema,
} from 'shared';

import { SongEntity } from './song.entity';
import { SongService } from './song.service';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  MutationOutputSchema,
  QueryOutputSchema,
} from '$lib/nestjs-graphql-zod';

@Resolver(() => SongEntity)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Query(() => [SongEntity])
  async songs(): Promise<SongEntity[]> {
    return this.songService.list();
  }

  @QueryOutputSchema(getSongOutputSchema)
  async song(
    @InputSchema(getSongInputSchema) input: GetSongInput,
  ): Promise<GetSongOutput> {
    return this.songService.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createSongOutputSchema)
  async createSong(
    @InputSchema(createSongInputSchema) input: CreateSongInput,
  ): Promise<CreateSongOutput> {
    return this.songService.create(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(deleteSongOutputSchema)
  async deleteSong(
    @InputSchema(deleteSongInputSchema) input: DeleteSongInput,
  ): Promise<DeleteSongOutput> {
    return this.songService.delete(input).then(handleEitherResponse);
  }
}
