import { Base } from '../common';
import { Event } from '../event';

export type EventInstance = Base & {
  event: Event;
  timeStart: Date;
  timeEnd: Date;
  specialName?: string | null;
  rating?: number | null;
};
