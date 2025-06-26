import { Args } from '@nestjs/graphql';
import { inputFromZod, QueryWithZod } from 'nestjs-graphql-zod';
import { extractNameAndDescription } from 'nestjs-graphql-zod/dist/helpers';
import type { AnyZodObject, ZodObject, ZodRawShape } from 'zod';

export function QueryInputSchema<T extends ZodObject<ZodRawShape>>(
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
