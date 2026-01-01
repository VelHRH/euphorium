import { Base } from '../database';

export interface Social extends Base {
  instagram?: string | null;
  x?: string | null;
  youtube?: string | null;
  facebook?: string | null;
}
