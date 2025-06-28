import { Either } from '@sweet-monads/either';

type CommonOutput<T> = { error: string } | { success: T };

export const handleEitherResponse = <L extends Error, R>(
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
