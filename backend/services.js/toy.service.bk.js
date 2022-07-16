const fs = require('fs');
const toys = require('../data/toy.json');

module.exports = {
  query,
};
function query(filterBy) {
  try {
    console.log('filters', _filters(filterBy));
    console.log('filterby ', filterBy);
    return filterBy ? _filters(filterBy) : toys;
  } catch (ex) {
    console.log('ex', ex);
  }
}

function _filters(filterBy) {
  const { name, stock, label, sorting, decr } = filterBy;

  const regex = new RegExp(name, 'i');
  let filterToys = toys.filter(toy => regex.test(toy.name));

  if (stock) {
    filterToys = toys.filter(toy => toy.inStock);
  }

  if (label) {
    console.log('the lable', label);
    filterToys = toys.filter(toy => toy.labels.includes(label));
    label === 'show' ? (filterToys = toys) : filterToys;
  }
  if (sorting) {
    if (decr) {
      let decr = toys.sort((a, b) => {
        if (a[sorting] > b[sorting]) return -1;
        if (a[sorting] < b[sorting]) return 1;
        console.log('sorting decr', decr);
        return 0;
      });

      filterToys = decr;
    } else {
      let incr = toys.sort((a, b) => {
        if (a[sorting] < b[sorting]) return -1;
        if (a[sorting] > b[sorting]) return 1;
        return 0;
      });
      filterToys = incr;
    }
  }
  return filterToys;
}
