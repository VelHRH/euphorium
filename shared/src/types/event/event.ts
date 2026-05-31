import { Base } from '../common';
import { Location } from '../location';

export type Event = Base & {
  name: string;
  location: Location;
  description: string;
  descriptionEmbedding: number[];
};
