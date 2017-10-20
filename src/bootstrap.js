const actions = require('./actions');

module.exports = (state, map) => {
  actions.enterRoom(state, map, state.location);
};
