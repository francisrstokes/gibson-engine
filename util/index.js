const items = require('./items');
const output = require('./output');
const loadSave = require('./load-save');
const writeSave = require('./write-save');
const prompt = require('./prompt');

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

module.exports = {
  getDynamicProperty,
  roomNameToString,

  prompt,
  items,
  output,
  loadSave,
  writeSave
};
