const items = require('./items');
const output = require('./output');
const loadSave = require('./load-save');
const writeSave = require('./write-save');
const prompt = require('./prompt');

const getDynamicProperty = (state, world, obj, prop) => {
  return (typeof obj[prop] === 'function')
    ? obj[prop](state)
    : obj[prop];
}

module.exports = {
  prompt,
  getDynamicProperty,
  items,
  output,
  loadSave,
  writeSave
};
