import { Artist } from '../artist/artist';
import { Base } from '../common';
import { Song } from '../song/song';

export interface SongWriter extends Base {
  song: Song;
  artist: Artist;
}
