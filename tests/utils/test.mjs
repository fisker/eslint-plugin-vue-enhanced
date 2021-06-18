import createEsmUtils from 'esm-utils'
import SnapshotRuleTester from './snapshot-rule-tester.mjs'

const {require} = createEsmUtils(import.meta)

function wrapCode(code, wrapper) {
  if (/\n/.test(code)) {
    code = `\n${code.split('\n').map((line) => `  ${line}`)}\n`
  }

  return `<${wrapper}>${code}</${wrapper}>`
}

function normalizeTestCases(testCase, type) {
  if (typeof testCase === 'string') {
    testCase = {code: testCase}
  }

  testCase.code = wrapCode(testCase.code, type)
  if (typeof testCase.output === 'string') {
    testCase.output = wrapCode(testCase.code, type)
  }

  return testCase
}

class Test {
  constructor(importMeta) {
    const {url} = importMeta
    const {ruleId} = url.match(/\/(?<ruleId>[^/]*?)\.mjs$/).groups

    const rule = require(`../../rules/${ruleId}.js`)

    this.ruleId = ruleId
    this.rule = rule
  }

  run(tests) {
    const {ruleId, rule} = this
    const {options, valid, invalid} = tests
    const tester = new SnapshotRuleTester({
      ruleId,
      rule,
      options: {
        parser: require.resolve('vue-eslint-parser'),
        ...options,
      },
    })
    tester.run({valid, invalid})
    return this
  }

  template(tests) {
    for (const type of ['valid', 'invalid']) {
      tests[type] = tests[type].map((testCase) =>
        normalizeTestCases(testCase, 'template')
      )
    }
    return this.run(tests)
  }
}

export default Test
