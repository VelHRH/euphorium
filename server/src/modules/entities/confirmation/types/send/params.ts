import { ConfirmationType, UserNoPassword } from 'shared';

export type SendConfirmationParams = {
  type: ConfirmationType;
  user: UserNoPassword;
};
