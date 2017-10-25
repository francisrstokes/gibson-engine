const { prompt } = require('../util');
const go = require('./go');
const look = require('./look');
const take = require('./items/take');
const examine = require('./items/examine');
const drop = require('./items/drop');

const LOOK_AROUND = 'Look around';
const TAKE = 'Take';
const EXAMINE = 'Examine';
const GO = 'Go';
const DROP = 'Drop';

const PROMPT_ACTION_STRING = 'What will you do';
const PROMPT_ACTION_CHOICES = [
  LOOK_AROUND,
  GO,
  EXAMINE,
  TAKE,
  DROP
];

const promptForAction = async (state, world) => {
  const action = await prompt.choice(PROMPT_ACTION_STRING, PROMPT_ACTION_CHOICES);

  switch (action) {
    case GO:
      await go(state, world);
      break;
    case LOOK_AROUND:
      await look(state, world);
      break;
    case TAKE:
      await take(state, world);
      break;
    case DROP:
      await drop(state, world);
      break;
    case EXAMINE:
      await examine(state, world);
      break;
  }
  await promptForAction(state, world);
};

module.exports = promptForAction;
