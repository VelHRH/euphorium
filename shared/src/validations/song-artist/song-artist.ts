import { artistSchema } from '../artist';
import { baseSchema } from '../database';
import { songSchema } from '../song';

export const songArtistSchema = baseSchema.extend({
  song: songSchema,
  artist: artistSchema,
});
