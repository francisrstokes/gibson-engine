const util = require('../../util');
const { getItemPromptForRoomAndInventory } = require('./item-util');
const {
  maybeFromCondition,
  maybeContinue,
  maybe,
  pipePromise
} = util.functional;
const {
  length,
  pipe,
  pipeP,
  gt,
  __,
  compose,
  prop,
  apply
} = require('ramda');
const {
  NOTHING_TO_USE,
  IT_DOES_NOTHING,
  WHICH_ITEM
} = require('../../strings');

const hasOnUseFunction = (item) => (typeof item.onUse === 'function');

module.exports = (state, world, input, output) => {
  return pipePromise(
    apply(getItemPromptForRoomAndInventory),              // [choice]
    maybeFromCondition(compose(gt(__, 0), length)),       // Maybe [choice]
    maybe(
      // Nothing
      () => output.writeLine(NOTHING_TO_USE),
      // Just
      pipeP(
        input.choice(WHICH_ITEM),                           // chosenItemName
        prop(__, world.items),                              // item
        util.hookedEventToMaybe('onBeforeUse', state, world),      // Maybe item
        maybeContinue(item => pipePromise(
          maybeFromCondition(hasOnUseFunction),             // Maybe item
          maybe(
            // Nothing
            () => Promise.resolve(output.writeLine(IT_DOES_NOTHING)),
            // Just
            () => util.hookEvent(item, 'onUse', state, world)
          ),
          () => util.hookEvent(item, 'onAfterUse', state, world)
        )(item))
      )
    ),
    output.newLine
  )([state, world])
};
