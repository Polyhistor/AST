// eslint exercise 1 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.2"
//   to move on to the next exercise

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow unnecessary semicolons',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // no options
  },
  create: function(context) {
    return {
      Identifier(node) {
        const isConsoleCall = looksLike(node, {
          name: 'console',
          parent: {
            type: 'MemberExpression',
            parent: {
              type: 'CallExpression',
            },
            property: {
              name: val => disAllowedMethods.includes(val),
            },
          },
        })

        if (isConsoleCall) {
          context.report({
            node,
            message: 'Using console is not allowed',
          })
        }
      },
    }
  },
}

const disAllowedMethods = ['log', 'info', 'warn']

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
