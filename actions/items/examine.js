const util = require('../../util');

const NOTHING_TO_EXAMINE = 'Nothing to examine';
const WHICH_ITEM = 'Which item?';
const INVENTORY_OR_LOCATION = 'Examine current location or our inventory?';
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
    const description = await util.getDynamicProperty(state, world, world.items[chosenItem], 'description');
    util.output.writeLine(description);
  } else {
    util.output.writeLine(NOTHING_TO_EXAMINE);
  }
  util.output.newLine();
};
