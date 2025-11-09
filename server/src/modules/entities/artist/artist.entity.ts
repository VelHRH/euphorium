import { Field, ObjectType } from '@nestjs/graphql';
import { Artist, Social, Song } from 'shared';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { SocialEntity } from '../social/social.entity';
import { SongArtistEntity } from '../song-artist/song-artist.entity';

import { BaseEntity } from '$modules/database/entities';

@ObjectType()
@Entity('artists')
export class ArtistEntity extends BaseEntity implements Artist {
  @Column({ nullable: false })
  @Field()
  readonly name: string;

  @OneToMany(() => SongArtistEntity, (songArtist) => songArtist.artist)
  @Field(() => [SongArtistEntity])
  readonly songs: Song[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly imgPath?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly label?: string;

  @OneToOne(() => SocialEntity, { nullable: true })
  @JoinColumn()
  @Field(() => SocialEntity, { nullable: true })
  readonly social?: Social;
}
