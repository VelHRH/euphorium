import { Event } from '../event';

export type SearchResult = {
  event: Omit<Event, 'descriptionEmbedding'>;
  similarity: number;
};