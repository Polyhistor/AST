// babel exercise 0 (captains-log)
// When you're finished with this exercise, run
//   "npm start exercise.babel.1"
//   to move on to the next exercise

import pluginTester from 'babel-plugin-tester';
import captainsLog from './captains-log';

pluginTester({
  plugin: captainsLog,
  snapshot: true,
  tests: [
    { code: `anything.log();`, snapshot: false },
    `console.log('sup dawg')`
  ]
});
