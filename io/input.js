const { curry } = require('ramda');
const inquirer = require('inquirer');
const { newLine } = require('./output');

const tap = (func) => (x) => {
  func();
  return x;
};

module.exports = {
  'continue': () => {
    return inquirer.prompt({
      type: 'input',
      message: 'Press enter to continue',
      name: 'throwAway'
    })
    .then(newLine);
  },
  choice: curry((message, options) => {
    return inquirer.prompt({
      type: 'list',
      message,
      name: 'response',
      choices: options
    })
    .then(tap(newLine))
    .then(res => res.response)
  }),
  getTextIn: (message) => {
    return inquirer.prompt([{
      message,
      type: 'input',
      name: 'response',
      validate: (input) => input !== ''
    }])
    .then(tap(newLine))
    .then(res => res.response);
  }
};
