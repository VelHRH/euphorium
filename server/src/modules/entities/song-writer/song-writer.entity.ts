import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Song, SongWriter } from 'shared';
import { Entity, ManyToOne } from 'typeorm';

import { ArtistEntity } from '../artist/artist.entity';
import { SongEntity } from '../song/song.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('song-writers')
export class SongWriterEntity extends BaseEntity implements SongWriter {
  @ManyToOne(() => SongEntity, (song) => song.id)
  @Field(() => SongEntity)
  readonly song: Song;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @Field(() => ArtistEntity)
  readonly artist: Artist;
}
