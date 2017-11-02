const util = require('../../util');
const { getItemPromptForRoomAndInventory } = require('./util');

const NOTHING_TO_EXAMINE = 'Nothing to examine';
const WHICH_ITEM = 'Which item?';

module.exports = async (state, world, input, output) => {
  const items = getItemPromptForRoomAndInventory(state, world);
  if (items.length) {
    const chosenItem = await input.choice(WHICH_ITEM, items);
    const worldItem = world.items[chosenItem];

    if (!util.hookEvent(worldItem, 'onBeforeExamine', state, world)) return;
    const description = await util.getDynamicProperty(state, world, worldItem, 'description');
    output.writeLine(description);
    if (!util.hookEvent(worldItem, 'onAfterExamine', state, world)) return;
  } else {
    output.writeLine(NOTHING_TO_EXAMINE);
  }
  output.newLine();
};
