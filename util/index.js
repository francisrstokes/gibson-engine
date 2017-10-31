const items = require('./items');
const loadSave = require('./load-save');
const writeSave = require('./write-save');
const player = require('./player');

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

module.exports = {
  getDynamicProperty,
  roomNameToString,
  objectToChoices,

  player,
  items,
  loadSave,
  writeSave
};
