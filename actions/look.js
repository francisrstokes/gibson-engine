const { items, getDynamicProperty } = require('../util');

const forEach = require('lodash.foreach');

const ITEM_HERE_1 = 'There is';
const ITEM_HERE_2 = 'here.';

const getItemHereString = (item) =>
`${ITEM_HERE_1} ${items.getPrefix(item)} ${items.getDisplayName(item)} ${ITEM_HERE_2}`;

module.exports = async (state, world, input, output) => {
  const currentLocation = world.rooms[state.location];
  const description = await getDynamicProperty(state, world, currentLocation, 'description');
  output.writeLine(description);

  forEach(currentLocation.items, (item) => {
    if (items.itemIsVisible(item)) {
      output.writeLine(getItemHereString(item));
    }
  });
  output.newLine();
};
