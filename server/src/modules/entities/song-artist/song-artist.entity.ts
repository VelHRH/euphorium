import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Song, SongArtist } from 'shared';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArtistEntity } from '../artist/artist.entity';
import { SongEntity } from '../song/song.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('song-artists')
export class SongArtistEntity extends BaseEntity implements SongArtist {
  @ManyToOne(() => SongEntity, (song) => song.id)
  @JoinColumn({ name: 'songId' })
  @Field(() => SongEntity)
  readonly song: Song;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @JoinColumn({ name: 'artistId' })
  @Field(() => ArtistEntity)
  readonly artist: Artist;
}
