import { Artist } from '../artist';
import { Base } from '../database';
import { Group } from '../group';

export interface Song extends Base {
  name: string;
  youtubeUrls: string[];
  album?: string;
  postedAt: Date;
  performers: Artist[];
  writers: Artist[];
  group?: Group;
}
