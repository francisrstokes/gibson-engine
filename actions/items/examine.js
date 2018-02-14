const util = require('../../util');
const { getItemPromptForRoomAndInventory } = require('./util');
const {
  maybeFromCondition,
  maybeContinue,
  maybe,
  pipePromise
} = util.functional;
const {
  apply,
  pipeP,
  prop,
  __,
  gt,
  compose,
  length
} = require('ramda');
const {
  NOTHING_TO_EXAMINE,
  WHICH_ITEM
} = require('../../strings');

module.exports = (state, world, input, output) =>
  pipePromise(
    apply(getItemPromptForRoomAndInventory),
    maybeFromCondition(compose(gt(__, 0), length)),
    maybe(
      () => output.writeLine(NOTHING_TO_EXAMINE),
      pipeP(
        input.choice(WHICH_ITEM),
        prop(__, world.items),
        util.hookEventFp('onBeforeExamine', state, world),
        maybeContinue(item => pipeP(
          util.getDynamicPropertyFp(state, world, 'description'),
          output.writeLine,
          () => item,
          util.hookEventFp('onAfterExamine', state, world)
        )(item))
      )
    ),
    output.newLine
  )([state, world]);
