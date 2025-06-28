import { Args } from '@nestjs/graphql';
import {
  inputFromZod,
  MutationWithZod,
  QueryWithZod,
} from 'nestjs-graphql-zod';
import { extractNameAndDescription } from 'nestjs-graphql-zod/dist/helpers';
import type { AnyZodObject, ZodObject, ZodRawShape } from 'zod';

export function InputSchema<T extends ZodObject<ZodRawShape>>(
  schema: T,
): ParameterDecorator {
  const { name } = extractNameAndDescription(schema, {});

  // Create GraphQL input type from schema
  const inputClass = inputFromZod(schema, {
    name,
  });

  return Args('input', { type: () => inputClass });
}

export function QueryOutputSchema<T extends AnyZodObject>(
  input: T,
): MethodDecorator {
  return QueryWithZod(input);
}

export function MutationOutputSchema<T extends AnyZodObject>(
  input: T,
): MethodDecorator {
  return MutationWithZod(input);
}
