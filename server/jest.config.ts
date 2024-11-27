import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(spec|test).ts'],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths as Record<string, string[]>,
    {
      prefix: '<rootDir>/src/',
    },
  ),
};

export default config;
