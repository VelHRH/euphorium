import { Artist } from '../artist';
import { Base } from '../database';
import { Show } from '../show';
import { Song } from '../song';

export interface Entry extends Base {
  show: Show;
  song: Song;
  countryCode?: string; // optional because not all shows have representing countries like Eurovision
  totalPoints?: number;
  publicPoints?: number;
  juryPoints?: number;
}
