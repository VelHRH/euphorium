import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Group, GroupMember } from 'shared';
import { Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '$modules/database/entities';
import { GroupEntity } from '../group/group.entity';
import { ArtistEntity } from '../artist/artist.entity';

@ObjectType()
@Entity('group-members')
export class GroupMemberEntity extends BaseEntity implements GroupMember {
  @ManyToOne(() => GroupEntity, (song) => song.id)
  @Field(() => GroupEntity)
  readonly group: Group;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @Field(() => ArtistEntity)
  readonly artist: Artist;
}
