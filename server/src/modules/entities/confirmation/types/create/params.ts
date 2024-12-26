import { ConfirmationType } from 'shared';

export type CreateConfirmationParams = {
  type: ConfirmationType;
  userId: number;
  id?: number;
};
