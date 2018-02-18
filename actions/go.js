const util = require('../util');
const {
  maybeFromCondition,
  maybeContinue,
  pipePromise
} = util.functional;
const {
  pipeP,
  compose,
  append,
  equals,
  not
} = require('ramda');

const enterRoom = require('./enter-room');
const {
  OPTION_STAY,
  YOU_CAN_GO
} = require('../strings.js');

module.exports = (state, world, input, output) => {
  return pipeP(
    util.getDynamicPropertyFp(state, world, 'exits'),            // [exit]
    append(OPTION_STAY),                                    // [exit]
    input.choice(YOU_CAN_GO),                               // chosenExit
    maybeFromCondition(compose(not, equals(OPTION_STAY))),  // Maybe chosenExit
    maybeContinue(chosenExit => pipePromise(
      () => world.rooms[state.location],                    // currentLocation
      util.hookedEventToMaybe('onExit', state, world),             // currentLocation
      maybeContinue(pipeP(
        () => enterRoom(state, world, chosenExit, input, output)
      ))
    )(chosenExit))
  )(world.rooms[state.location]);
};
