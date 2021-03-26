// eslint exercise 0 (no-console)
// When you're finished with this exercise, run
//   "npm start exercise.eslint.1"
//   to move on to the next exercise

module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of console',
      category: 'Best practices',
      recommended: true
    }
  },
  // eslint-disable-next-line no-unused-vars
  create(context) {
    return {
      Identifier(node) {
        console.log(node);
        if (node.name !== 'console') {
          return;
        }
        context.report({
          node,
          message: 'Using console is not allowed'
        });
      }
    };
  }
};
