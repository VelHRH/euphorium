import { Base } from '../database';
import { Venue } from '../venue';

export interface Show extends Base {
  name: string;
  venue: Venue;
  date: Date;
}
