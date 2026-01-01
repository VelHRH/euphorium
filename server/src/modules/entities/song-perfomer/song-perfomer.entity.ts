import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Song, SongPerformer } from 'shared';
import { Entity, ManyToOne } from 'typeorm';

import { ArtistEntity } from '../artist/artist.entity';
import { SongEntity } from '../song/song.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('song-performers')
export class SongPerformerEntity extends BaseEntity implements SongPerformer {
  @ManyToOne(() => SongEntity, (song) => song.id)
  @Field(() => SongEntity)
  readonly song: Song;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @Field(() => ArtistEntity)
  readonly artist: Artist;
}
