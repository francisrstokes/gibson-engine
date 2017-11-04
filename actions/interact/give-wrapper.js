const { YOU_HAVE_NOTHING, GIVE_WHAT } = require('../../strings');

module.exports = (state, world, input, output, giveFunc) =>
  async () => {
    if (state.inventory.length) {
      const itemName = await input.choice(GIVE_WHAT, state.inventory.map(item => item.name));
      await giveFunc(itemName, state, world);
    } else {
      output.writeLine(YOU_HAVE_NOTHING);
    }
  };
