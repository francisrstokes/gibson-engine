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
    const secondItem = await input.choice(WHICH_ITEM, items.filter(item => item.value !== chosenItem));

    let continueAfterHook = await util.hookEvent(world.items[chosenItem], 'onBeforeUseWith', state, world, secondItem);
    if (!continueAfterHook) return;

    if (typeof world.items[chosenItem].onUseWith === 'function') {
      await world.items[chosenItem].onUseWith(secondItem, state, world);
    } else {
      output.writeLine(IT_DOES_NOTHING);
    }

    continueAfterHook = await util.hookEvent(world.items[chosenItem], 'onAfterUseWith', state, world, secondItem);
    if (!continueAfterHook) return;
  } else {
    output.writeLine(NOTHING_TO_USE);
  }
  output.newLine();
};
