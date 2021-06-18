import Test from './utils/test.mjs'

const test = new Test(import.meta)

test.template({
  valid: [
    '<div v-not-show="foo"></div>',
    '<div :hidden="foo"></div>',
    '<div hidden="foo"></div>',
  ],
  invalid: [
    '<div v-show="foo"></div>',
    '<div v-show="(foo)"></div>',
    '<div v-show="!foo"></div>',
    '<div v-show="(!foo)"></div>',
    '<div v-show="!(foo)"></div>',
    '<div v-show="1 + 2"></div>',
    '<div v-show></div>',
  ],
})
