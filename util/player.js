module.exports = {
  itemInInventory: (state, itemName) => {
    return state.inventory.find(item => item.name === itemName)
  }
};
