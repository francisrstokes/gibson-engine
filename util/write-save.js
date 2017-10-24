const { promisify } = require('util');
const writeFileAsync = promisify(require('fs').writeFile);

const keys = Object.keys;

module.exports = (saveFileLocation, world, state) => {
  const saveData = {
    state,
    world: {}
  };

  keys(world).forEach(roomKey => {
    saveData.world[roomKey] = {
      items: world[roomKey].items.map(item => item.state),
      actors: world[roomKey].actors.map(actor => actor.state)
    }
  });

  return writeFileAsync(saveFileLocation, JSON.stringify(saveData));
}
