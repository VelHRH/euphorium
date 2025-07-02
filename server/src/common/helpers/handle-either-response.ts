import { Either } from '@sweet-monads/either';

import { BaseException } from '$exceptions';

export const handleEitherResponse = <L extends BaseException, R>(
  either: Either<L, R>,
): R => {
  if (either.isLeft()) {
    throw either.value;
  }

  return either.value;
};
