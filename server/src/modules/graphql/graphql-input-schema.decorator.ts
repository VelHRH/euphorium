import { Args } from '@nestjs/graphql';
import { inputFromZod } from 'nestjs-graphql-zod';
import { extractNameAndDescription } from 'nestjs-graphql-zod/dist/helpers';
import { type ZodObject, type ZodRawShape } from 'zod';

export function GqlInputSchema<T extends ZodObject<ZodRawShape>>(
  schema: T,
): ParameterDecorator {
  const { name } = extractNameAndDescription(schema, {});

  // Create GraphQL input type from schema
  const inputClass = inputFromZod(schema, {
    name,
  });

  return Args('input', { type: () => inputClass });
}
