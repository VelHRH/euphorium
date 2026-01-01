import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Song } from 'shared';
import { Column, Entity, OneToMany } from 'typeorm';

import { SongWriterEntity } from '../song-writer/song-writer.entity';

import { BaseEntity } from '$modules/database/entities';
import { SongPerformerEntity } from '../song-perfomer/song-perfomer.entity';

@ObjectType()
@Entity('songs')
export class SongEntity extends BaseEntity implements Song {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @OneToMany(() => SongPerformerEntity, (songPerformer) => songPerformer.song)
  @Field(() => [SongPerformerEntity])
  readonly performers: Artist[];

  @OneToMany(() => SongWriterEntity, (songWriter) => songWriter.song)
  @Field(() => [SongWriterEntity])
  readonly writers: Artist[];

  @Column()
  @Field()
  readonly album: string;

  @Column('text', { array: true, default: [] })
  @Field(() => [String])
  readonly youtubeUrls: string[];

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date)
  readonly postedAt: Date;
}
