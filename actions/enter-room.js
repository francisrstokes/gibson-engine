const { output } = require('../util');

module.exports = async (state, world, location) => {
  state.location = location;
  const currentLocation = world.rooms[state.location];

  const doLook = ('onEnter' in currentLocation)
    ? await currentLocation.onEnter(state, world)
    : true;

  if (doLook) {
    output.writeLine(currentLocation.description);
  }
};
