import { Artist } from '../artist';
import { Base } from '../database';
import { Social } from '../social';

export interface Group extends Base {
  name: string;
  imgPath?: string;
  social?: Social;
  members: Artist[];
}
