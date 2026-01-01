import { Base } from '../database';
import { Social } from '../social';

export interface Artist extends Base {
  name: string;
  imgPath?: string | null;
  label?: string | null;
  social?: Social | null;
}
