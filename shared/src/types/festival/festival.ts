import { Base } from '../common';
import { Show } from '../show';

export interface Festival extends Base {
  name: string;
  dateStart: Date;
  dateEnd: Date;
  shows: Show[];
}
