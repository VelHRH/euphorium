import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Group, Song } from 'shared';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { SongWriterEntity } from '../song-writer/song-writer.entity';

import { BaseEntity } from '$modules/database/entities';
import { SongPerformerEntity } from '../song-perfomer/song-perfomer.entity';
import { GroupEntity } from '../group/group.entity';

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

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly album?: string | null;

  @Column('text', { array: true, default: [] })
  @Field(() => [String])
  readonly youtubeUrls: string[];

  @Column({ type: 'timestamp', nullable: false })
  @Field(() => Date)
  readonly postedAt: Date;

  @ManyToOne(() => GroupEntity, (group) => group.id, { nullable: true })
  @Field(() => GroupEntity, { nullable: true })
  readonly group?: Group | null;
}
