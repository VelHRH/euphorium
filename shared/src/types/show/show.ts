import { Base, Name, Image } from '../common';
import { Venue } from '../venue';

export type Show = Base &
  Name &
  Image & {
    venue: Venue;
    date: Date;
  };
