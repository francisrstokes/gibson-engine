const util = require('../../util');
const { getItemPromptForRoomAndInventory } = require('./util');

const NOTHING_TO_USE = 'Nothing to use';
const IT_DOES_NOTHING = 'Doesn\'t seem to do anything.';
const WHICH_ITEM = 'Which item?';

module.exports = async (state, world) => {
  const items = getItemPromptForRoomAndInventory(state, world);

  if (items.length) {
    const chosenItem = await util.prompt.choice(WHICH_ITEM, items);
    if (typeof world.items[chosenItem].onUse === 'function') {
      await world.items[chosenItem].onUse(state, world);
    } else {
      util.output.writeLine(IT_DOES_NOTHING);
    }
  } else {
    util.output.writeLine(NOTHING_TO_USE);
  }
  util.output.newLine();
};
