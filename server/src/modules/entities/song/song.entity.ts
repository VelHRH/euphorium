import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Song } from 'shared';
import { Column, Entity, OneToMany } from 'typeorm';

import { SongArtistEntity } from '../song-artist/song-artist.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('songs')
export class SongEntity extends BaseEntity implements Song {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @OneToMany(() => SongArtistEntity, (songArtist) => songArtist.song)
  @Field(() => [SongArtistEntity])
  readonly artists: Artist[];

  @Column()
  @Field()
  readonly album: string;

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date)
  readonly postedAt: Date;
}
