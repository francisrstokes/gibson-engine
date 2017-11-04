const { getItemPromptForRoomAndInventory } = require('./util');
const util = require('../../util');
const {
  NOTHING_TO_USE,
  IT_DOES_NOTHING,
  WHICH_ITEM
} = require('../../strings');

module.exports = async (state, world, input, output) => {
  const items = getItemPromptForRoomAndInventory(state, world);

  if (items.length) {
    const chosenItem = await input.choice(WHICH_ITEM, items);

    let continueAfterHook = await util.hookEvent(world.items[chosenItem], 'onBeforeUse', state, world);
    if (!continueAfterHook) return;

    if (typeof world.items[chosenItem].onUse === 'function') {
      await world.items[chosenItem].onUse(state, world);
    } else {
      output.writeLine(IT_DOES_NOTHING);
    }

    continueAfterHook = await util.hookEvent(world.items[chosenItem], 'onAfterUse', state, world);
    if (!continueAfterHook) return;
  } else {
    output.writeLine(NOTHING_TO_USE);
  }
  output.newLine();
};
