const util = require('../../util');
const {
  NOTHING_TO_TAKE,
  YOU_CANT_TAKE,
  WHICH_ITEM,
  NONE,
  YOU_ADD_1,
  YOU_ADD_2
} = require('../../strings');

const getItemAddedString = (item) =>
  `${YOU_ADD_1} ${util.items.getPrefix(item)} ${util.items.getDisplayName(item)} ${YOU_ADD_2}`;

module.exports = async (state, world, input, output) => {
  const visibleItems = world.rooms[state.location].items.filter(util.items.itemIsVisible);

  if (visibleItems.length) {
    const names = [...visibleItems.map(item => item.name), NONE];
    const chosenItemName = await input.choice(WHICH_ITEM, names);
    if (chosenItemName !== NONE) {
      const chosenItem = visibleItems.find(item => item.name === chosenItemName);

      let continueAfterHook = await util.hookEvent(world.items[chosenItemName], 'onBeforeTake', state, world);
      if (!continueAfterHook) return;

      if (util.items.itemIsTakeable(chosenItem)) {
        world.rooms[state.location].items = world.rooms[state.location].items.filter(roomItem => roomItem.name !== chosenItemName);
        state.inventory.push(chosenItem);

        const takeText = (chosenItem.state.takeText)
          ? chosenItem.state.takeText
          : getItemAddedString(chosenItem);

        output.writeLine(takeText);
      } else {
        const cantTakeText = (chosenItem.state.cantTakeText)
          ? chosenItem.state.cantTakeText
          : YOU_CANT_TAKE;
        output.writeLine(cantTakeText);
      }

      continueAfterHook = await util.hookEvent(world.items[chosenItemName], 'onAfterTake', state, world);
      if (!continueAfterHook) return;
    }
  } else {
    output.writeLine(NOTHING_TO_TAKE);
  }

  output.newLine();
};
