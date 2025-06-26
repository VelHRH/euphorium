import { ValidationError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@sweet-monads/either';

type CommonOutput<T> = { error: string } | { success: T };

@Injectable()
export class CommonService {
  handleEitherResponse<L extends Error, R>(
    either: Either<L, R>,
  ): CommonOutput<R> {
    if (either.isLeft()) {
      return {
        error: either.value.message,
      };
    }

    return {
      success: either.value,
    };
  }

  private validateWithSchema<T>(
    schema: { parse: (input: unknown) => T },
    input: unknown,
  ): Either<ValidationError, T> {
    try {
      const validatedInput = schema.parse(input);

      return right(validatedInput);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (error.errors) {
        const errors = error.errors as { message: string }[];
        const errorMessage = errors[0].message;

        return left(new ValidationError(errorMessage));
      }

      throw error; // if it's not validation error, throw it
    }
  }

  withValidation<T, R, E extends Error>(
    schema: { parse: (input: unknown) => T },
    input: unknown,
    businessLogic: (validatedInput: T) => Promise<Either<E, R>>,
  ): Promise<Either<ValidationError | E, R>> {
    return this.validateWithSchema(schema, input).asyncChain(businessLogic);
  }
}
