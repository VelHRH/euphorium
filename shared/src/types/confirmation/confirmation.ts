import { ConfirmationType } from '../../constants';
import { Base } from '../database';
import { User } from '../user';

export interface Confirmation extends Base {
  expires: Date;
  token: string;
  type: ConfirmationType;
  user: User;
}
