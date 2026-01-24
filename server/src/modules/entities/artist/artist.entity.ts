import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Social } from 'shared';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { SocialEntity } from '../social/social.entity';
import { SongWriterEntity } from '../song-writer/song-writer.entity';

import { BaseEntity } from '$modules/database/entities';
import { SongPerformerEntity } from '../song-perfomer/song-perfomer.entity';

@ObjectType()
@Entity('artists')
export class ArtistEntity extends BaseEntity implements Artist {
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
  readonly imgPath?: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly label?: string | null;

  @OneToOne(() => SocialEntity, { nullable: true })
  @JoinColumn()
  @Field(() => SocialEntity, { nullable: true })
  readonly social?: Social | null;
}
