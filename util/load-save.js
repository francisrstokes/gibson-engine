const { lstat, readFile } = require('fs');
const promisify = require('util').promisify;
const lstatAsync = promisify(lstat);
const readFileAsync = promisify(readFile);

const keys = Object.keys;
module.exports = async (options, world, _state) => {
  let state = _state;
  try {
    const stats = await lstatAsync(options.saveFileLocation);
    if (stats.isFile()) {
      const file = await readFileAsync(options.saveFileLocation, 'utf8');
      const saveData = JSON.parse(file);

      state = saveData.state;
      keys(saveData.world.rooms)
        .forEach((roomKey) => {
          world.rooms[roomKey].items = saveData.world.rooms[roomKey].items;
          world.rooms[roomKey].actors = saveData.world.rooms[roomKey].actors;
        });
    }
  } catch (ex) {
    //
  }

  state._options = options;

  return {
    world,
    state
  };
}
