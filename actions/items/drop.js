const util = require('../../util');

const YOU_CANT_DROP = 'You can\'t drop that.';
const WHICH_ITEM = 'Which item?';
const NONE = '[None]';

const YOU_DROP = 'You drop';

const getItemDroppedString = (item) => {
  const prefix = (item.prefix)
    ? ` ${item.prefix}`
    : '';
  return `${YOU_DROP}${prefix} ${item.name}`;
};

module.exports = async (state, world) => {
  if (state.inventory.length) {
    const names = [...state.inventory.map(item => item.name), NONE];
    const chosenItemName = await util.prompt.choice(WHICH_ITEM, names);

    if (chosenItemName !== NONE) {
      const chosenItem = state.inventory.find(item => item.name === chosenItemName);
      if (util.items.itemIsDropable(chosenItem)) {
        console.log(state.inventory.items);
        state.inventory = state.inventory.filter(inventoryItem => inventoryItem.name !== chosenItemName);
        world.rooms[state.location].items.push(chosenItem);
        util.output.writeLine(getItemDroppedString(chosenItem));
      } else {
        util.output.writeLine(YOU_CANT_DROP);
      }
    }
  }
};
