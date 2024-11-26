import joi from 'joi';

export const databaseValidationSchema = joi.object({
  DATABASE_URL: joi
    .string()
    .uri({ scheme: [/postgres/] })
    .optional(),
});

export const databaseConfig = () => ({
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/modules/database/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
});
