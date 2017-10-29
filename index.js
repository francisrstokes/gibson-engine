const promptForAction = require('./actions');
const enterRoom = require('./actions/enter-room');
const loadSave = require('./util/load-save');

module.exports = async ($state, $world, options = {}) => {
  if (!options.saveFileLocation) {
    console.log('Error: No saveFileLocation provided to options');
    process.exit(1);
  }

  const input = options.input || require('./io/input');
  const output = options.output || require('./io/output');

  const { state, world } = await loadSave(options, $world, $state);

  await enterRoom(state, world, state.location, input, output);
  promptForAction(state, world, input, output);
};
