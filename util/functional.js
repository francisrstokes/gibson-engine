const { curry, pipeP } = require('ramda');
const Maybe = require('folktale/maybe');

// maybeFromCondition :: (a -> Boolean) -> a -> Maybe a
const maybeFromCondition = curry((pred, value) => pred(value) ? Maybe.of(value) : Maybe.Nothing());

// maybe :: (* -> b) -> (a -> b) -> Maybe a -> b
const maybe = curry((errFn, successFn, M) => M.matchWith({
  Just: x => successFn(x.value),
  Nothing: () => errFn()
}));

// maybeContinue -> (a -> b) -> Maybe a -> b
const maybeContinue = maybe(() => {});

// mutableSet :: String -> Object -> a -> a
const mutableSet = curry((propName, obj, value) => {
  obj[propName] = value;
  return value;
});

// propDefault -> String -> Object -> a -> a
const propDefault = curry((propName, obj, def) => (propName in obj) ? obj[propName] : def);

// promiseResolve :: a -> Promise Error a
const promiseResolve = a => Promise.resolve(a);

// pipePromise :: (a -> b) -> (b -> c) -> ... -> (... -> z) -> a -> Promise z
const pipePromise = (...fns) => pipeP(promiseResolve, ...fns);

module.exports = {
  maybeFromCondition,
  maybe,
  maybeContinue,
  mutableSet,
  propDefault,
  promiseResolve,
  pipePromise
};
