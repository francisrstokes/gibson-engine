const { items, getDynamicProperty } = require('../util');
const forEach = require('lodash.foreach');

const ITEM_HERE_1 = 'There is';
const ITEM_HERE_2 = 'here.';

const getItemHereString = (item) => {
  const prefix = (item.prefix)
    ? ` ${item.prefix}`
    : '';
  return `${ITEM_HERE_1}${prefix} ${item.name} ${ITEM_HERE_2}`;
};

module.exports = async (state, world, input, output) => {
  const currentLocation = world.rooms[state.location];
  const description = await getDynamicProperty(state, world, currentLocation, 'description');
  output.writeLine(description);

  forEach(currentLocation.items, (item) => {
    if (items.itemIsVisible(item)) {
      output.writeLine(getItemHereString(world.items[item.name]));
    }
  });
  output.newLine();
};
