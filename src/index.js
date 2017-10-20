const getState = require('./state');
const map = require('./rooms/test-map');
const bootstrap = require('./bootstrap');
require('colors');

(async () => {
  const state = await getState();
  await bootstrap(state, map);
})();
