import { Base } from '../database';

export interface Festival extends Base {
  name: string;
  dateStart: Date;
  dateEnd: Date;
}
