const get = require('lodash.get');
const set = require('lodash.set');

module.exports = {
  'start': {
    description: 'You are in a dark room...',
    exits: [
      {
        name: 'North',
        room: 'test-room-two'
      },
      {
        name: 'East',
        room: 'test-room-two'
      },
      {
        name: 'Into the dingy tunnel',
        room: 'test-room-two'
      }
    ],
    onEnter: (state) => {
      if (!get(state, 'roomData["test-room"].seen')) {
        set(state, 'roomData["test-room"].seen', true);
        process.stdout.write('Ffffiiiiirst time!\n');
      }
    }
  }
};
