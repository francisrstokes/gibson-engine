const path = require('path');
const { promisify } = require('util');
const { readFile } = require('fs');
const readFileAsync = promisify(readFile);


const createBaseState = () => ({
  location: 'start',
  inventory: []
});

module.exports = async () => {
  try {
    const state = await readFileAsync(path.join(__dirname, 'state.json'), 'utf8');
    return JSON.parse(state);
  } catch (ex) {
    return createBaseState();
  }
};
