import { Artist } from '../artist';
import { Base } from '../database';

export interface Song extends Base {
  name: string;
  album?: string;
  postedAt: Date;
  artists: Artist[];
}
