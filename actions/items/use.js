// Use is essentially "use in room"
const util = require('../../util');

const NOTHING_TO_USE = 'Nothing to use';
const IT_DOES_NOTHING = 'Doesn\'t seem to do anything.';
const WHICH_ITEM = 'Which item?';
const INVENTORY_OR_LOCATION = 'From current location or your inventory?';
const INVENTORY = 'Inventory';
const CURRENT_LOCATION = 'Current location';

module.exports = async (state, world) => {
  const lookInInventory = await util.prompt.choice(INVENTORY_OR_LOCATION, [
    { name: INVENTORY, value: true },
    { name: CURRENT_LOCATION, value: false }
  ]);

  const items = (lookInInventory)
    ? state.inventory
    : world.rooms[state.location].items;

  if (items.length) {
    const chosenItem = await util.prompt.choice(WHICH_ITEM, items.map(item => item.name));
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
