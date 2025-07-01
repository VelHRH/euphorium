import { Either, left, right } from '@sweet-monads/either';

import { ValidationException } from '$exceptions';

const validateWithSchema = <T>(
  schema: { parse: (input: unknown) => T },
  input: unknown,
): Either<ValidationException, T> => {
  try {
    const validatedInput = schema.parse(input);

    return right(validatedInput);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (error.errors) {
      const errors = error.errors as { message: string }[];
      const errorMessage = errors[0].message;

      return left(new ValidationException(errorMessage));
    }

    throw error; // if it's not validation error, throw it
  }
};

export const withValidation = <T, R, E extends Error>(
  schema: { parse: (input: unknown) => T },
  input: unknown,
  businessLogic: (validatedInput: T) => Promise<Either<E, R>>,
): Promise<Either<ValidationException | E, R>> => {
  return validateWithSchema(schema, input).asyncChain(businessLogic);
};
