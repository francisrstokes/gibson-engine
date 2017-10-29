const { getDynamicProperty } = require('../util');
const enterRoom = require('./enter-room');

const OPTION_STAY = 'Stay';
const YOU_CAN_GO = 'You can go';

module.exports = async (state, world, input, output) => {
  const currentLocation = world.rooms[state.location];
  const exits = await getDynamicProperty(state, world, currentLocation, 'exits');
  const chosenExit = await input.choice(YOU_CAN_GO, [...exits, OPTION_STAY]);

  if (chosenExit !== OPTION_STAY) {
    const doEnter = ('onExit' in currentLocation)
      ? await currentLocation.onExit(state, world)
      : true;
    if (doEnter) await enterRoom(state, world, chosenExit, input, output);
  }
};
