const inquirer = require('inquirer');

module.exports = {
  'continue': () => {
    return inquirer.prompt({
      type: 'input',
      message: 'Press enter to continue',
      name: 'throwAway'
    });
  },
  choice: (message, options) => {
    return inquirer.prompt({
      type: 'list',
      message,
      name: 'response',
      choices: options
    }).then(res => res.response);
  },
  getTextIn: (message) => {
    return inquirer.prompt([{
      message,
      type: 'input',
      name: 'response',
      validate: (input) => input !== ''
    }]).then(res => res.response);
  }
};
