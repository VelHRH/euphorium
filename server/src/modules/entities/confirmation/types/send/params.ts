import { ConfirmationType, User } from 'shared';

export type SendConfirmationParams = {
  type: ConfirmationType;
  user: User;
};
