const go = require('./go');
const look = require('./look');
const take = require('./items/take');
const examine = require('./items/examine');
const drop = require('./items/drop');
const use = require('./items/use');

const LOOK_AROUND = 'Look around';
const TAKE = 'Take';
const EXAMINE = 'Examine';
const GO = 'Go';
const DROP = 'Drop';
const USE = 'Use';

const PROMPT_ACTION_STRING = 'What will you do';
const PROMPT_ACTION_CHOICES = [
  LOOK_AROUND,
  GO,
  EXAMINE,
  TAKE,
  DROP,
  USE
];

const promptForAction = async (state, world, input, output) => {
  const action = await input.choice(PROMPT_ACTION_STRING, PROMPT_ACTION_CHOICES);

  switch (action) {
    case GO:
      await go(state, world, input, output);
      break;
    case LOOK_AROUND:
      await look(state, world, input, output);
      break;
    case TAKE:
      await take(state, world, input, output);
      break;
    case DROP:
      await drop(state, world, input, output);
      break;
    case EXAMINE:
      await examine(state, world, input, output);
      break;
    case USE:
      await use(state, world, input, output);
      break;
  }

  await promptForAction(state, world, input, output);
};

module.exports = promptForAction;
