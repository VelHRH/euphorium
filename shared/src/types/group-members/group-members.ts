import { Artist } from '../artist';
import { Base } from '../database';
import { Group } from '../group';

export interface GroupMembers extends Base {
  group: Group;
  artist: Artist;
}
