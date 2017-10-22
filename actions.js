const {
  prompt,
  getLocationProperty
} = require('./util');

const OPTION_STAY = 'Stay';

const LOOK_AROUND = 'Look around';
// const INVENTORY = 'Inventory';
const GO = 'Go';
// const COMMAND = 'Command';

async function goFunc (state, map) {
  const currentLocation = map[state.location];
  const exits = await getLocationProperty(state, currentLocation, 'exits');
  const chosenExit = await prompt.choice('You can go', [...exits, OPTION_STAY]);

  if (chosenExit !== OPTION_STAY) {
    const doEnter = ('onExit' in currentLocation)
      ? await currentLocation.onExit(state, map)
      : true;
    if (doEnter) await enterRoom(state, map, chosenExit);
  }
}

async function lookFunc (state, map) {
  const currentLocation = map[state.location];
  if (typeof currentLocation.description === 'function') {
    await currentLocation.description(state, map);
  } else {
    process.stdout.write(`${currentLocation.description}\n`);
  }
}

async function enterRoom (state, map, location) {
  state.location = location;
  const currentLocation = map[state.location];
  const doLook = ('onEnter' in currentLocation)
    ? await currentLocation.onEnter(state, map)
    : true;
  if (doLook) {
    process.stdout.write(`${currentLocation.description}\n`);
  }
}

async function promptForAction (state, map) {
  const action = await prompt.choice(
    'What will you do',
    [
      LOOK_AROUND,
      GO
    ]
  );

  switch (action) {
    case GO:
      await goFunc(state, map);
      break;
    case LOOK_AROUND:
      await lookFunc(state, map);
      break;
  }
  await promptForAction(state, map);
}

module.exports = { promptForAction, enterRoom };
