import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';

import { GraphqlPath } from './graphql.constants';

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), GraphqlPath.SCHEMA),
  sortSchema: true,
};
