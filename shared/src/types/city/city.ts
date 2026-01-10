import { Base, Name } from '../common';

export type City = Base &
  Name & {
    countryCode: string;
  };
