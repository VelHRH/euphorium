import { Artist } from '../artist';
import { Base } from '../common';
import { Show } from '../show';
import { Song } from '../song';

export interface Entry extends Base {
  show: Show;
  song: Song;
  countryCode?: string | null; // optional because not all shows have representing countries like Eurovision
  totalPoints?: number | null;
  publicPoints?: number | null;
  juryPoints?: number | null;
}
