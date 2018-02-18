const util = require('../../util');
const INVENTORY = 'Inventory';

const createItemOption = (locationStr) =>
  (item) => ({
    name: `${locationStr}: ${util.items.getDisplayName(item)}`,
    value: item.name
  });

const inventoryOption = () => createItemOption(INVENTORY);
const roomNameOption = (roomName) => createItemOption(util.roomNameToString(roomName));

const getItemPromptForRoomAndInventory = (state, world) => ([
  ...state.inventory.map(inventoryOption()),
  ...world.rooms[state.location].items.map(roomNameOption(state.location))
]);


module.exports = {
  createItemOption,
  inventoryOption,
  roomNameOption,
  getItemPromptForRoomAndInventory
};
