'use strict'

const {createRule} = require('./utils/rule.js')

const MESSAGE_ID = 'no-v-show'
const selector = [
  'VAttribute',
  '[directive!=false]',
  ' > ',
  'VDirectiveKey.key',
  '[name.type="VIdentifier"]',
  '[name.name="show"]',
].join('')

module.exports = createRule({
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer `hidden` attribute over `v-show` directive.',
    },
    fixable: 'code',
    messages: {
      [MESSAGE_ID]: 'Please `:hidden` instead of `v-show`.',
    },
  },
  create() {
    return {
      [selector](node) {
        return {
          node,
          messageId: MESSAGE_ID,
          *fix(fixer) {
            yield fixer.replaceText(node, ':hidden')

            const valueExpression = node.parent.value

            if (!valueExpression) {
              return
            }

            const value = valueExpression.expression

            yield fixer.insertTextBefore(value, '!(')
            yield fixer.insertTextAfter(value, ')')
          },
        }
      },
    }
  },
})
