// codemod exercise 0 (ymnn-jquery)
// When you're finished with this exercise, run
//   "npm start exercise.codemod.1"
//   to move on to the next exercise

import pluginTester from 'babel-plugin-tester';
import ymnnJquery from './ymnn-jquery';

pluginTester({
  plugin: ymnnJquery,
  tests: [
    { code: 'foo.hide();', snapshot: false },
    { code: `$(el).hide();`, snapshot: true }
  ]
});
