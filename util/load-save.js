const { lstat, readFile } = require('fs');
const promisify = require('util').promisify;
const lstatAsync = promisify(lstat);
const readFileAsync = promisify(readFile);

const keys = Object.keys;
const applyRoomPropToWorld = (world, saveData) =>
  (roomKey) => {
    ['items', 'actors'].forEach(prop => {
      keys(saveData.world[roomKey][prop]).forEach(propKey => {
        world[roomKey][prop].find(roomThing => roomThing.name === propKey).state = saveData.world[roomKey][prop][propKey];
      });
    });
  };

module.exports = async (options, world, _state) => {
  let state = _state;
  try {
    const stats = await lstatAsync(options.saveFileLocation);
    if (stats.isFile()) {
      const saveData = await JSON.parse(readFileAsync(options.saveFileLocation, 'utf8'));
      state = saveData.state;
      keys(saveData.world).forEach(applyRoomPropToWorld(world, saveData));
    }
  } catch (ex) {}

  state._options = options;

  return {
    world,
    state
  };
}
