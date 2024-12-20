import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';

import { GraphqlPath } from './graphql.constants';

import { GqlContext } from '$modules/app/types';

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), GraphqlPath.SCHEMA),
  sortSchema: true,
  playground: false,
  context: (ctx: GqlContext) => ctx,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
};
