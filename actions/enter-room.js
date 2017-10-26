const { output, getDynamicProperty } = require('../util');

module.exports = async (state, world, location) => {
  state.location = location;
  const currentLocation = world.rooms[state.location];

  const doLook = ('onEnter' in currentLocation)
    ? await currentLocation.onEnter(state, world)
    : true;

  if (doLook) {
    const description = await getDynamicProperty(state, world, currentLocation, 'description');
    output.writeLine(description);
    output.newLine();
  }
};
