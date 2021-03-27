// eslint exercise 5 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.6"
//   to move on to the next exercise

const { RuleTester } = require('eslint');
const rule = require('./no-console');

const ruleTester = new RuleTester();
ruleTester.run('no-console', rule, {
  valid: [
    'info()',
    'console',
    'console.log',
    'console.baz()',
    { code: 'console.warn()', options: [{ allowedMethods: ['warn'] }] }
  ],
  invalid: [
    invalid('console.log()', 'logger.log()'),
    invalid('console.info()', 'logger.info()'),
    invalid('console.warn()', 'logger.warn()'),
    invalid(
      `
        var csl = console
        csl.log()
      `,
      `
        var csl = logger
        csl.log()
      `
    ),
    {
      code: 'bad code',
      errors: [{}],
      output: 'good code'
    }
  ]
});

function invalid(code, output) {
  const invalidTest = {
    code,
    errors: [{ message: 'Using console is not allowed' }]
  };
  if (output) {
    invalidTest.output = output;
  }
  return invalidTest;
}
