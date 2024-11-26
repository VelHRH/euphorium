import { DataSource, DataSourceOptions } from 'typeorm';

import 'dotenv/config';
import { Config } from '$config';
import { databaseConfig } from '$config/database';

type DatabaseOptions = (config: Config['database']) => DataSourceOptions;

export const databaseOptions: DatabaseOptions = (config) => ({
  type: 'postgres',
  ...config,
});

export default new DataSource(databaseOptions(databaseConfig()));
