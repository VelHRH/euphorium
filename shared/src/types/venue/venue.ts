import { Base } from '../common';

export interface Venue extends Base {
  name: string;
  countryCode: string;
  city: string;
  latitude: number;
  longitude: number;
  imgPath?: string | null;
}
