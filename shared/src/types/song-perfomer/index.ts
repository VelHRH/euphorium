import { Artist } from '../artist/artist';
import { Base } from '../database';
import { Song } from '../song/song';

export interface SongPerformer extends Base {
  song: Song;
  artist: Artist;
}
