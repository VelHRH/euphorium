import { Base } from '../database';
import { User } from '../user';

export interface Session extends Base {
  refreshToken: string;
  user: User;
}
