const get = require('lodash.get');

module.exports = {
  itemIsVisible: (item) => get(item, 'state.see', true),
  itemIsTakeable: (item) => get(item, 'state.take', false),
  itemIsDropable: (item) => get(item, 'state.drop', false)
};
