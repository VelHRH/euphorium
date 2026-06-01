import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Config } from '$config';
import { databaseConfig } from '$config/database';
import 'dotenv/config';

type DatabaseOptions = (config: Config['database']) => DataSourceOptions;

export const databaseOptions: DatabaseOptions = (config) => ({
  type: 'postgres',
  ...config,
  namingStrategy: new SnakeNamingStrategy(),
  ssl: {
    rejectUnauthorized: false,
  },
});

export default new DataSource(databaseOptions(databaseConfig()));
