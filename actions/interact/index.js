const { objectToChoices } = require('../../util');
const giveWrapper = require('./give-wrapper');

const {
  WITH_WHO,
  THERE_IS_NOONE,
  THEY_SAY_NOTHING,
  TALK,
  GIVE
} = require('../../strings');

const defaultAction = (output, str) => () => output.writeLine(str);

const interactionsToChoices = (state, world, input, output, actor) => {
  const actorBase = world.actors[actor.name];

  const choices = [
    {
      name: `${TALK} ${actor.name}`,
      value: (actorBase.onTalk)
        ? actorBase.onTalk
        : defaultAction(THEY_SAY_NOTHING)
    }
  ];

  if (actorBase.onGive) {
    choices.push({
      name: `${GIVE} ${actor.name}`,
      value: giveWrapper(state, world, input, output, actorBase.onGive)
    });
  }

  return choices;
};

module.exports = async (state, world, input, output) => {
  const actors = world.rooms[state.location].actors;

  if (actors.length) {
    const who = await input.choice(WITH_WHO, actors.map(objectToChoices));
    const chosenAction = await input.choice(`[${who.name}]`, interactionsToChoices(state, world, input, output, who));
    await chosenAction(state, world);
  } else {
    output.writeLine(THERE_IS_NOONE);
  }
};
