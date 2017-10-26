const look = require('./look');

module.exports = async (state, world, location) => {
  state.location = location;
  const currentLocation = world.rooms[state.location];

  const doLook = ('onEnter' in currentLocation)
    ? await currentLocation.onEnter(state, world)
    : true;

  if (doLook) {
    await look(state, world);
  }
};
