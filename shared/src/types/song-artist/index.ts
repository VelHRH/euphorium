import { Artist } from '../artist/artist';
import { Base } from '../database';
import { Song } from '../song/song';

export interface SongArtist extends Base {
  song: Song;
  artist: Artist;
}
