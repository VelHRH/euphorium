import { Base } from '../common';

export type Event = Base & {
  name: string;
  description: string;
  descriptionEmbedding: number[];
};
