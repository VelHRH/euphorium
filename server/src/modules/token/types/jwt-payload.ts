export type JwtPayload = {
  accessToken: {
    email: string;
    userId: number;
  };
  refreshToken: {
    decodedRefreshToken: string;
  };
};
