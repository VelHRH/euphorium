import { Field, ObjectType } from '@nestjs/graphql';
import { Show, Song, SongVideo } from 'shared';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ShowEntity } from '../show/show.entity';
import { SongEntity } from '../song/song.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('song-videos')
export class SongVideoEntity extends BaseEntity implements SongVideo {
  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly youtubeUrl?: string;

  @ManyToOne(() => SongEntity, (song) => song.id)
  @JoinColumn({ name: 'songId' })
  @Field(() => SongEntity)
  readonly song: Song;

  @ManyToOne(() => ShowEntity, (show) => show.id, { nullable: true })
  @JoinColumn({ name: 'showId' })
  @Field(() => ShowEntity, { nullable: true })
  readonly show?: Show;

  @Column({ nullable: false })
  @Field()
  readonly isPrimary: boolean;
}
