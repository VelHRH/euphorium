import { Artist } from '../artist';
import { Base } from '../common';
import { Group } from '../group';

export interface Song extends Base {
  name: string;
  youtubeUrls: string[];
  album?: string | null;
  postedAt: Date;
  performers: Artist[];
  writers: Artist[];
  group?: Group | null;
}
