const writeSave = require('../util/write-save');

const LOOK_AROUND = 'Look around';
const TAKE = 'Take';
const EXAMINE = 'Examine';
const GO = 'Go';
const DROP = 'Drop';
const USE = 'Use';
const INTERACT = 'Interact with';

const actionToChoice = (action, func) => ({
  name: action,
  value: func
});

const PROMPT_ACTION_STRING = 'What will you do';
const PROMPT_ACTION_CHOICES = [
  actionToChoice(LOOK_AROUND, require('./look')),
  actionToChoice(GO, require('./go')),
  actionToChoice(EXAMINE, require('./items/examine')),
  actionToChoice(TAKE, require('./items/take')),
  actionToChoice(DROP, require('./items/drop')),
  actionToChoice(USE, require('./items/use')),
  actionToChoice(INTERACT, require('./interact'))
];

const promptForAction = async (state, world, input, output) => {
  const action = await input.choice(PROMPT_ACTION_STRING, PROMPT_ACTION_CHOICES);
  await action(state, world, input, output);

  // hook save
  await writeSave(state._options.saveFileLocation, world, state);

  await promptForAction(state, world, input, output);
};

module.exports = promptForAction;
