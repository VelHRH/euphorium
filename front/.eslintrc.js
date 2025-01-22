// yarn add --dev eslint prettier eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-prettier @typescript-eslint/eslint-plugin eslint-config-prettier

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    '.prettierrc',
    'node_modules/*',
    '.next',
    'next.config.js',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-duplicate-imports': 'error', // imports from the same source must be in one record
    'import/no-cycle': ['error', { maxDepth: '∞' }],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^(@?\\w|\\w)'], // libs
          ['^\\$\\.*'], // ts-aliases
          ['^\\./'], // relative folder imports
          ['^\\.\\./'], // parent folder imports
        ],
      },
    ],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: ['return', 'if', 'function', 'while', 'try', 'throw', 'class'],
      },
      {
        blankLine: 'always',
        prev: ['if', 'function', 'while', 'throw', 'class'],
        next: '*',
      },
      { blankLine: 'any', prev: 'const', next: ['const', 'let'] },
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'any', prev: 'const', next: 'const' },
      {
        blankLine: 'always',
        prev: 'multiline-const',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'multiline-const',
      },
    ],
    'consistent-return': 'off',
    'eslint-comments/disable-enable-pair': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    'arrow-parens': ['error', 'always'],
    curly: ['error', 'all'],
    'prefer-destructuring': 'error',
    'default-case': 'error',
    'no-restricted-exports': [
      'error',
      { restrictDefaultExports: { defaultFrom: true } },
    ],
    'func-names': ['error', 'always', { generators: 'never' }],
    'no-void': ['error', { allowAsStatement: true }], // we allow to use "void" to mark promises we don't wait for
    'no-unused-expressions': ['error'], // we prefer to use callFunction?.() instead of callFunction && callFunction()
    'no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],
    'no-dupe-keys': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
    'no-underscore-dangle': ['off'], // we regulate an use of an underscore by other rules
    'no-plusplus': 'off', // It's okay to use ++ operator
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 1 }],
    '@next/next/no-head-element': 'off',
    '@next/next/no-img-element': 'off',
  },
}
