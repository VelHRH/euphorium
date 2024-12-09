import { Base } from '../database';
import { Session } from '../session';

export interface User extends Base {
  email: string;
  password?: string;
  session: Session[];
}
