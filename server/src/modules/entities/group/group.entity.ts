import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Group, Social, Song } from 'shared';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { GroupMemberEntity } from '../group-member/group-member.entity';
import { SocialEntity } from '../social/social.entity';
import { SongEntity } from '../song/song.entity';

@ObjectType()
@Entity('groups')
export class GroupEntity extends BaseEntity implements Group {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @OneToOne(() => SocialEntity, { nullable: true })
  @JoinColumn()
  @Field(() => SocialEntity, { nullable: true })
  readonly social?: Social | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  readonly imgPath?: string | null;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.group)
  @Field(() => [GroupMemberEntity])
  readonly members: Artist[];

  @OneToMany(() => SongEntity, (song) => song.group)
  @Field(() => [SongEntity])
  readonly songs: Song[];
}
