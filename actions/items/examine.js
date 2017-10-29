const util = require('../../util');
const { getItemPromptForRoomAndInventory } = require('./util');

const NOTHING_TO_EXAMINE = 'Nothing to examine';
const WHICH_ITEM = 'Which item?';

module.exports = async (state, world, input, output) => {
  const items = getItemPromptForRoomAndInventory(state, world);
  if (items.length) {
    const chosenItem = await input.choice(WHICH_ITEM, items);
    const description = await util.getDynamicProperty(state, world, world.items[chosenItem], 'description');
    output.writeLine(description);
  } else {
    output.writeLine(NOTHING_TO_EXAMINE);
  }
  output.newLine();
};
