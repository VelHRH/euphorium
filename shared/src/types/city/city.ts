import { Base } from '../common';

export type City = Base & {
  name: string;
  countryCode: string;
};
