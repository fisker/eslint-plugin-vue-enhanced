const isIterable = (object) => typeof object[Symbol.iterator] === 'function'

function reportListenerProblems(listener, context) {
  // Listener arguments can be `codePath, node` or `node`
  return function (...listenerArguments) {
    let problems = listener(...listenerArguments)

    if (!problems) {
      return
    }

    if (!isIterable(problems)) {
      problems = [problems]
    }

    // TODO: Allow `fix` function to abort
    for (const problem of problems) {
      if (problem) {
        context.report(problem)
      }
    }
  }
}

function reportProblems(create) {
  return (context) =>
    Object.fromEntries(
      Object.entries(create(context)).map(([selector, listener]) => [
        selector,
        reportListenerProblems(listener, context),
      ])
    )
}

function checkVueSfc(create, options) {
  const {checkTemplateBlock, checkScriptBlock} = {
    checkTemplateBlock: true,
    checkScriptBlock: true,
    ...options,
  }

  if (!checkTemplateBlock && !checkScriptBlock) {
    return create
  }

  return (context) => {
    const listeners = create(context)

    // `vue-eslint-parser`
    if (
      !context.parserServices ||
      !context.parserServices.defineTemplateBodyVisitor
    ) {
      return listeners
    }

    const templateBlockListeners = checkTemplateBlock ? listeners : {}
    const scriptBlockListeners = checkScriptBlock ? listeners : {}

    return context.parserServices.defineTemplateBodyVisitor(
      templateBlockListeners,
      scriptBlockListeners
    )
  }
}

function createRule(rule, options) {
  let {create} = rule
  create = reportProblems(create)
  create = checkVueSfc(create, options)

  return {
    ...rule,
    meta: {
      schema: [],
      ...rule.meta,
    },
    create,
  }
}

module.exports = {createRule}
