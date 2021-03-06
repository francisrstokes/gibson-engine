const items = require('./items');
const loadSave = require('./load-save');
const writeSave = require('./write-save');
const player = require('./player');

const NONE = '[None]';

const getDynamicProperty = (state, world, obj, prop) => {
  return (typeof obj[prop] === 'function')
    ? obj[prop](state)
    : obj[prop];
};

const roomNameToString = (name, splitter = '-') =>
  name
    .split(splitter)
    .map(str => str.slice(0, 1).toUpperCase() + str.slice(1, str.length))
    .join(' ');

const objectToChoices = (obj) => ({
  name: obj.name,
  value: obj
});

const hookEvent = (thing, event, state, world, ...rest) => {
  if (typeof thing[event] === 'function') {
    return thing[event](...rest, state, world);
  }
  return true;
};

module.exports = {
  getDynamicProperty,
  roomNameToString,
  objectToChoices,
  hookEvent,

  player,
  items,
  loadSave,
  writeSave
};
