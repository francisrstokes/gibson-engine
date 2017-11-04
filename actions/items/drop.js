const util = require('../../util');

const {
  YOU_CANT_DROP,
  WHICH_ITEM,
  NONE,
  YOU_DROP
} = require('../../strings');

const getItemDroppedString = (item) =>
  `${YOU_DROP}${util.items.getPrefix(item)} ${util.items.getDisplayName(item)}`;


module.exports = async (state, world, input, output) => {
  const currentRoom = world.rooms[state.location];
  if (state.inventory.length) {
    const names = [...state.inventory.map(item => item.name), NONE];
    const chosenItemName = await input.choice(WHICH_ITEM, names);

    if (chosenItemName !== NONE) {
      let continueAfterHook = await util.hookEvent(world.items[chosenItemName], 'onBeforeDrop', state, world);
      if (!continueAfterHook) return;

      const chosenItem = state.inventory.find(item => item.name === chosenItemName);
      if (util.items.itemIsDropable(chosenItem)) {
        state.inventory = state.inventory.filter(inventoryItem => inventoryItem.name !== chosenItemName);
        currentRoom.items.push(chosenItem);

        const dropText = (chosenItem.state.dropText)
          ? chosenItem.state.dropText
          : getItemDroppedString(chosenItem);

        continueAfterHook = await util.hookEvent(world.items[chosenItemName], 'onAfterDrop', state, world);
        if (!continueAfterHook) return;

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
