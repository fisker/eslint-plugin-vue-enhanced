# eslint-plugin-vue-enhanced

> ESLint plugins for Vue.

## Installation

```bash
yarn add eslint-plugin-vue-enhanced --dev
```

## Usage

Add this to your `.eslintrc.js`

```js
module.exports = {
  extends: ['plugin:vue-enhanced/recommended']
};
```

## Rules

- [`no-v-show`](./docs/no-v-show.md) - Prefer `hidden` attribute over `v-show` directive.
