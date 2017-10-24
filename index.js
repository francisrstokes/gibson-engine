const promptForAction = require('./actions');
const enterRoom = require('./actions/enter-room');
const loadSave = require('./util/load-save');

module.exports = async ($state, $world, options = {}) => {
  if (!options.saveFileLocation) {
    console.log('Error: No saveFileLocation provided to options');
    process.exit(1);
  }

  const { state, world } = await loadSave(options.saveFileLocation, $world, $state);

  await enterRoom(state, world, state.location);
  promptForAction(state, world);
};
