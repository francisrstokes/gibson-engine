const util = require('../../util');
const { getItemPromptForRoomAndInventory } = require('./util');
const {
  NOTHING_TO_EXAMINE,
  WHICH_ITEM
} = require('../../strings');

module.exports = async (state, world, input, output) => {
  const items = getItemPromptForRoomAndInventory(state, world);
  if (items.length) {
    const chosenItem = await input.choice(WHICH_ITEM, items);
    const worldItem = world.items[chosenItem];

    let continueAfterHook = await util.hookEvent(worldItem, 'onBeforeExamine', state, world);
    if (!continueAfterHook) return;

    const description = await util.getDynamicProperty(state, world, worldItem, 'description');
    output.writeLine(description);

    continueAfterHook = util.hookEvent(worldItem, 'onAfterExamine', state, world);
    if (!continueAfterHook) return;
  } else {
    output.writeLine(NOTHING_TO_EXAMINE);
  }
  output.newLine();
};
