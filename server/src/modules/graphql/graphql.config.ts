import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { join } from 'node:path';
import { ZodError } from 'zod';

import { GraphqlPath } from './graphql.constants';
import { ErrorType } from './types';

import { BaseException, ValidationException } from '../../common/exceptions';

import { GqlContext } from '$modules/app/types';

interface FormattedErrorResponse {
  message: string;
  stacktrace: string[] | undefined;
  type: ErrorType;
}

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), GraphqlPath.SCHEMA),
  sortSchema: true,
  playground: false,
  context: ({ req, res }: GqlContext) => ({ req, res }),
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  formatError: (formattedError, error): FormattedErrorResponse => {
    if (!(error instanceof GraphQLError)) {
      return {
        message: formattedError.message,
        stacktrace: undefined,
        type: ErrorType.ERROR,
      };
    }

    const { originalError } = error;

    if (!originalError) {
      return {
        message: formattedError.message,
        stacktrace: undefined,
        type: ErrorType.ERROR,
      };
    }

    // Handle Zod validation errors
    if (originalError instanceof ZodError) {
      // Get the first error issue for the main error message
      const firstIssue = originalError.issues[0];
      const errorMessage = firstIssue?.message || 'Validation failed';

      const exception = new ValidationException(errorMessage);

      // Preserve original stack if available
      if (originalError.stack !== undefined && originalError.stack.length > 0) {
        exception.stack = originalError.stack;
      }

      return {
        message: exception.message,
        stacktrace: exception.stack?.split('\n'),
        type: ErrorType.EXCEPTION,
      };
    }

    return {
      message: formattedError.message,
      stacktrace: originalError.stack?.split('\n'),
      type:
        originalError instanceof BaseException
          ? ErrorType.EXCEPTION
          : ErrorType.ERROR,
    };
  },
};
