import { Base } from '../common';
import { Show } from '../show';

export type Festival = Base & {
  name: string;
  dateStart: Date;
  dateEnd: Date;
  shows: Show[];
  imgPaths: string[];
};
