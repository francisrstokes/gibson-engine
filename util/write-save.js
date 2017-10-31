const { promisify } = require('util');
const writeFileAsync = promisify(require('fs').writeFile);

const keys = Object.keys;

const stateFulObjectWithName = (obj) =>
  Object.assign(
    { name: obj.name },
    { state: obj.state }
  );


module.exports = (saveFileLocation, world, state) => {
  const saveData = {
    state,
    world: { rooms: {} }
  };
  keys(world.rooms).forEach(roomKey => {
    saveData.world.rooms[roomKey] = {
      items: world.rooms[roomKey].items.map(stateFulObjectWithName),
      actors: world.rooms[roomKey].actors.map(stateFulObjectWithName)
    }
  });

  return writeFileAsync(saveFileLocation, JSON.stringify(saveData));
}
