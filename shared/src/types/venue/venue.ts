import { City } from '../city';
import { Base, Image, Name } from '../common';

export type Venue = Base &
  Image &
  Name & {
    city: City;
    latitude: number;
    longitude: number;
  };
