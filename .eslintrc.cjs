module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  ignorePatterns: ['dist', 'node_modules'],
};
