import { Base } from '../common';
import { Event } from '../event';
import { Location } from '../location';

export type EventInstance = Base & {
  event: Event;
  location: Location;
  timeStart: Date;
  timeEnd: Date;
  specialName?: string | null;
  rating?: number | null;
};
