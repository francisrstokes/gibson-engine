const util = require('../../util');
const {
  maybeFromCondition,
  maybeContinue,
  propDefault,
  mutableSet,
  pipePromise
} = util.functional;
const {
  curry,
  pipe,
  pipeP,
  prop,
  length,
  compose,
  gt,
  filter,
  __,
  map,
  append,
  equals,
  not,
  ifElse,
  find
} = require('ramda');
const {
  YOU_CANT_DROP,
  WHICH_ITEM,
  NONE,
  YOU_DROP
} = require('../../strings');

const getItemDroppedString = (item) =>
  `${YOU_DROP} ${util.items.getPrefix(item)} ${util.items.getDisplayName(item)}`;

// Object -> [Item]
const pInventory = prop('inventory');

// pName :: Object -> String
const pName = prop('name');

// stateToMaybeInventoryChoices :: State -> Maybe [Item]
const stateToMaybeInventoryChoices = compose(
  map(append(NONE)),
  maybeFromCondition(compose(gt(__, 0), length)),
  pInventory
);

// itemNameToItem :: String -> Item
const itemNameToItem = curry((state, itemName) => find(compose(equals(itemName), pName), state.inventory));

// tryToDropItem :: Item -> *
const tryToDropItem = curry((state, world, output, item) => pipePromise(
  util.hookedEventToMaybe('onBeforeDrop', state, world),
  maybeContinue(pipe(
    () => mutableSet('inventory', state,
      filter(inItem => inItem.name !== item.name, state.inventory)),
    () => mutableSet('items', world.rooms[state.location],
        append(item, world.rooms[state.location].items)),
    () => pipe(
      compose(propDefault('dropText', item.state), getItemDroppedString),
      output.writeLine
    )(item),
  ))
)(item));

// cantDropItem :: Item -> *
const cantDropItem = curry((output, item) => pipe(
  () => propDefault('cantDropText', item.state, YOU_CANT_DROP),
  output.writeLine
)(item));

module.exports = (state, world, input, output) => {
  return pipePromise(
    stateToMaybeInventoryChoices,
    maybeContinue(pipeP(
      input.choice(WHICH_ITEM),
      maybeFromCondition(compose(not, equals(NONE))),
      maybeContinue(pipePromise(
        itemNameToItem(state),
        ifElse(
          util.items.itemIsDropable,
          tryToDropItem(state, world, output),
          cantDropItem(output)
        ),
        output.newLine
      ))
    ))
  )(state)
};
