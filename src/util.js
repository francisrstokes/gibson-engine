const inquirer = require('inquirer');

const _continue = () => {
  return inquirer.prompt({
    type: 'input',
    message: 'Press enter to continue',
    name: 'throwAway'
  });
};

const choice = (message, options) => {
  return inquirer.prompt({
    type: 'list',
    message,
    name: 'response',
    choices: options
  }).then(res => res.response);
}

const getLocationProperty = (state, location, property) => {
  return (typeof location[property] === 'function')
    ? location[property](state)
    : location[property];
};

module.exports = {
  prompt: {
    'continue': _continue,
    choice
  },
  getLocationProperty
};
