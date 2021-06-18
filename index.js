'use strict'

const {loadRules} = require('./rules/utils/rule.js')

const rules = loadRules()

module.exports = {
  configs: {
    recommended: {
      plugins: ['vue-enhanced'],
    },
    rules: Object.fromEntries(
      Object.keys(rules).map((ruleId) => [`vue-enhanced/${ruleId}`, 'error'])
    ),
  },
  rules,
}
