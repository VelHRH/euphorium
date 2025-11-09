import { Base } from '../database';

export interface Venue extends Base {
  name: string;
  countryCode: string;
  city: string;
  latitude: number;
  longitude: number;
}
