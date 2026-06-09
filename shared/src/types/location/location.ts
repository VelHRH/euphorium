import { Base } from '../common';
import { City } from '../city';
import { LocationType } from '../../constants';

export type Location = Base & {
  name: string;
  city: City;
  latitude: number;
  longitude: number;
  type: LocationType;
};
