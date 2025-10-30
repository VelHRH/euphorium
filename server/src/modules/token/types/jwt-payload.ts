import { Base } from 'shared';

export type JwtPayload = {
  accessToken: {
    email: string;
    userId: Base['id'];
  };
  refreshToken: {
    decodedRefreshToken: string;
  };
};
