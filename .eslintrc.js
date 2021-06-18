/*!
 * config file for `eslint`
 *
 * update: wget -O .eslintrc.js https://git.io/fjVjK
 * document: https://eslint.org/docs/user-guide/configuring
 */

'use strict'

/* @fisker/eslint-config https://git.io/fjOeH */

module.exports = {
  root: true,
  env: {},
  parserOptions: {},
  extends: ['@fisker'],
  settings: {},
  rules: {
    'node/no-unsupported-features/es-builtins': ['error', {version: '12'}],
  },
  plugins: [],
  globals: {},
  overrides: [
    {
      files: ['**/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: ['error', 'global'],
        'no-implicit-globals': 'off',
      },
    },
  ],
}
