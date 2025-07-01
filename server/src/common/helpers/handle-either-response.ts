import { Either } from '@sweet-monads/either';

import { BaseException } from '$exceptions';

type CommonOutput<T> = { error: string } | { success: T };

export const handleEitherResponse = <L extends BaseException, R>(
  either: Either<L, R>,
): CommonOutput<R> => {
  if (either.isLeft()) {
    return {
      error: either.value.message,
    };
  }

  return {
    success: either.value,
  };
};
