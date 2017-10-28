const { roomNameToString } = require('../../util');
const INVENTORY = 'Inventory';

const createItemOption = (locationStr) =>
(item) => ({
  name: `${locationStr}: ${item.name}`,
  value: item.name
});
const inventoryOption = () => createItemOption(INVENTORY);
const roomNameOption = (roomName) => createItemOption(roomNameToString(roomName));

const getItemPromptForRoomAndInventory = (state, world) => ([
  ...state.inventory.map(inventoryOption),
  ...world.rooms[state.location].items.map(roomNameOption(state.location))
]);

module.exports = {
  createItemOption,
  inventoryOption,
  roomNameOption,
  getItemPromptForRoomAndInventory
};
