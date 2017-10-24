const { output, items } = require('../util');
const forEach = require('lodash.foreach');

const ITEM_HERE_1 = 'There is';
const ITEM_HERE_2 = 'here.';

const getItemHereString = (item) => {
  const prefix = (item.prefix)
    ? ` ${item.prefix}`
    : '';
  return `${ITEM_HERE_1}${prefix} ${item.name} ${ITEM_HERE_2}`;
};

module.exports = async (state, world) => {
  const currentLocation = world.rooms[state.location];
  if (typeof currentLocation.description === 'function') {
    await currentLocation.description(state, world);
  } else {
    output.writeLine(currentLocation.description);

    forEach(currentLocation.items, (item) => {
      if (items.itemIsVisible(item)) {
        output.writeLine(getItemHereString(item));
      }
    });
  }
};
