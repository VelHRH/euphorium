import { Base } from '../common';
import { EventInstance } from '../event-instance';

export type EventReview = Base & {
  eventInstance: EventInstance;
  rating: number;
  comment: string;
  commentEmbedding: number[];
};
