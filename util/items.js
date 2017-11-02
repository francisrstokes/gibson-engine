const get = require('lodash.get');

const createStatefulCheckFunction = (prop, fallbackProp) =>
  (thing) => (thing.state[prop])
    ? thing.state[prop]
    : (fallbackProp !== '')
      ? thing[fallbackProp]
      : '';

module.exports = {
  itemIsVisible: (item) => get(item, 'state.see', true),
  itemIsTakeable: (item) => get(item, 'state.take', false),
  itemIsDropable: (item) => get(item, 'state.drop', false),
  getDisplayName: createStatefulCheckFunction('displayName', 'name'),
  getPrefix: createStatefulCheckFunction('prefix', '')
};
