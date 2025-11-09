import { Base } from '../database';
import { Show } from '../show';
import { Song } from '../song/song';

export interface SongVideo extends Base {
  youtubeUrl?: string;
  song: Song;
  show?: Show;
  isPrimary: boolean;
}
