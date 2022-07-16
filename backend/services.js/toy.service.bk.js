const fs = require('fs');
const toys = require('../data/toy.json');

module.exports = {
  query,
};
function query() {
  try {
    return toys;
  } catch (ex) {
    console.log('ex', ex);
  }
}
