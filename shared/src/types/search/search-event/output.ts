import { Event } from '../../event';
import { SearchOutput } from '../output';

export type SearchEventOutput = SearchOutput<
  Omit<Event, 'descriptionEmbedding'>
>;
