const js = require('@eslint/js');
const globals = require('globals');

const customRules = {
  'func-names': ['error', 'as-needed'],
  'no-multiple-empty-lines': ['error', { max: 1 }],
  'no-undef-init': ['error'],
  'object-curly-newline': ['error', {
    consistent: true,
    minProperties: 2,
    multiline: true,
  }],
  'object-curly-spacing': ['error', 'always'],
  'object-property-newline': ['error', { allowMultiplePropertiesPerLine: false }],
  'sort-keys': ['error', 'asc'],
};

module.exports = [
  {
    ignores: ['assets/built/**', 'dist/**', 'node_modules/**', '.cache/**'],
  },
  js.configs.recommended,
  {
    files: ['assets/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        gtag: 'readonly',
        snippetsData: 'readonly',
      },
      sourceType: 'script',
    },
    rules: customRules,
  },
  {
    files: ['sw.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.serviceworker,
      sourceType: 'script',
    },
    rules: customRules,
  },
  {
    files: ['eslint.config.js', 'postcss.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.nodeBuiltin,
      sourceType: 'commonjs',
    },
    rules: customRules,
  },
];
