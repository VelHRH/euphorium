import { Artist } from '../artist/artist';
import { Base } from '../database';
import { Song } from '../song/song';

export interface SongWriter extends Base {
  song: Song;
  artist: Artist;
}
