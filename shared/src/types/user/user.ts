import { Base } from '../database';

export interface User extends Base {
  email: string;
  password?: string | null;
}
