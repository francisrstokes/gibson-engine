const inquirer = require('inquirer');

// const LOOK_AROUND = 'Look around';
// const INVENTORY = 'Inventory';
const GO = 'Go';
// const COMMAND = 'Command';

async function goFunc (state, map) {
  const currentLocation = map[state.location];
  const chosenExit = await inquirer.prompt([{
    message: 'You can go',
    choices: [
      ...currentLocation.exits.map(exit => ({
        name: exit.name,
        value: exit.room
      })),
      'Stay'
    ],
    name: 'response',
    type: 'list'
  }]).then(res => res.response);

  if (chosenExit === 'Stay') {
    await promptForAction(state, map);
  } else {
    if ('onExit' in currentLocation) {
      currentLocation.onExit(state);
    }
    await enterRoom(state, map, chosenExit);
  }
}

async function enterRoom (state, map, location) {
  state.location = location;
  const currentLocation = map[state.location];
  if ('onEnter' in currentLocation) {
    currentLocation.onEnter(state);
  }
  process.stdout.write(`${currentLocation.description}\n`);
  await promptForAction(state, map);
}

async function promptForAction (state, map) {
  const action = await inquirer.prompt([
    {
      message: 'What will you do',
      choices: [
        GO
      ],
      name: 'response',
      type: 'list'
    }
  ]).then(res => res.response);

  switch (action) {
    case GO:
      await goFunc(state, map);
      break;
    default:
  }
}

module.exports = { promptForAction, enterRoom };
