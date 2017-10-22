const actions = require('./actions');

module.exports = async (state, map) => {
  await actions.enterRoom(state, map, state.location);
  actions.promptForAction(state, map);
};
