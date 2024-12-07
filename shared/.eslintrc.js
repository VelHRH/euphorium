const importSortOrderRule = {
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        ['^(@?\\w|\\w)'], // libs
        ['^$\\.*'], // ts-aliases
        ['^\\./'], // relative folder imports
        ['^\\.\\./'], // parent folder imports
      ],
    },
  ],
};

const importRules = {
  'import/extensions': 'off', // if error then throws error on $module/???/module
  'no-duplicate-imports': 'error', // imports from the same source must be in one record
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['./module'],
          message: 'Please import modules directly.',
        },
      ],
    },
  ],
  'import/no-cycle': 'off',
  'import/prefer-default-export': 'off', // we use only named exports in the project
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: ['scripts/*.ts'],
    },
  ],
  ...importSortOrderRule,
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2023,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: [
    'eslint-plugin-import',
    'simple-import-sort',
    'typescript-sort-keys',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '.prettierrc.js'],
  rules: {
    ...importRules,
  },
};
