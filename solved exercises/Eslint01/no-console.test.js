// eslint exercise 1 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.2"
//   to move on to the next exercise

const {RuleTester} = require('eslint')
const rule = require('./no-console')

const ruleTester = new RuleTester()
ruleTester.run('no-console', rule, {
  valid: ['info()', 'console', 'console.log'],
  invalid: [
    invalid('console.log()'),
    invalid('console.info()'),
    invalid('console.warn()'),
  ],
})

function invalid(code) {
  return {
    code,
    errors: [{message: 'Using console is not allowed'}],
  }
}
