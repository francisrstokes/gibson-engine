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

module.exports = async (state, world, input, output) => {
  if (state.inventory.length) {
    const names = [...state.inventory.map(item => item.name), NONE];
    const chosenItemName = await input.choice(WHICH_ITEM, names);

    if (chosenItemName !== NONE) {
      const chosenItem = state.inventory.find(item => item.name === chosenItemName);
      if (util.items.itemIsDropable(chosenItem)) {
        state.inventory = state.inventory.filter(inventoryItem => inventoryItem.name !== chosenItemName);
        world.rooms[state.location].items.push(chosenItem);

        const dropText = (chosenItem.state.dropText)
          ? chosenItem.state.dropText
          : getItemDroppedString(chosenItem);

        output.writeLine(dropText);
      } else {
        const cantDropText = (chosenItem.state.cantDropText)
          ? chosenItem.state.cantDropText
          : YOU_CANT_DROP;
        output.writeLine(cantDropText);
      }
    }
  }
  output.newLine();
};
