import { Base, ConfirmationType } from 'shared';

export type CreateConfirmationParams = {
  type: ConfirmationType;
  userId: Base['id'];
  id?: Base['id'];
};
