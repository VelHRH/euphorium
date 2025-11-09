import { Base } from '../database';

export interface Social extends Base {
  instagram?: string;
  x?: string;
  youtube?: string;
  facebook?: string;
}
