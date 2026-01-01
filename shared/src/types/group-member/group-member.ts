import { Artist } from '../artist';
import { Base } from '../database';
import { Group } from '../group';

export interface GroupMember extends Base {
  group: Group;
  artist: Artist;
}
