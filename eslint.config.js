import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTs,
      sourceType: 'module',
      ecmaVersion: 'latest'
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  },
  {
    ignores: ['**/*.js', 'node_modules/**']
  }
];
