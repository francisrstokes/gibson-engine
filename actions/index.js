const { prompt } = require('../util');
const go = require('./go');
const look = require('./look');
const take = require('./items/take');

const LOOK_AROUND = 'Look around';
const TAKE = 'Take';
const VIEW_ITEMS = 'View items';
const GO = 'Go';

const PROMPT_ACTION_STRING = 'What will you do';
const PROMPT_ACTION_CHOICES = [
  LOOK_AROUND,
  GO,
  TAKE
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
  }
  await promptForAction(state, world);
};

module.exports = promptForAction;
