import { Base } from '../common';

export interface User extends Base {
  email: string;
  password?: string | null;
}
