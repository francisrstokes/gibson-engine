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

module.exports = async (saveFileLocation, world, state) => {
  try {
    const stats = await lstatAsync(saveFileLocation);
    if (stats.isFile()) {
      const saveData = await JSON.parse(readFileAsync(saveFileLocation, 'utf8'));
      state = saveData.state;
      keys(saveData.world).forEach(applyRoomPropToWorld(world, saveData));
    }
  } catch (ex) {}

  return {
    world,
    state
  };
}
