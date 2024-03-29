import { createStore } from 'vuex';
import { storageService } from '../services/storage.service.js';
import { toyService } from '../services/toy.service.js';
// create a store instance
const store = createStore({
  strict: true,
  state() {
    return {
      toys: null,
      toy: null,
      filterBy: {},
      labels: toyService.labels(),
    };
  },
  mutations: {
    setToys(state, { toys }) {
      console.log('toys mu', toys);
      state.toys = JSON.parse(JSON.stringify(toys));
    },
    removeToy(state, { id }) {
      console.log('id mu', id);
      const idx = state.toys.findIndex(toy => {
        return toy._id === id;
      });
      console.log('idx', idx);
      return state.toys.splice(idx, 1);
    },
    getToy(state, { toy }) {
      console.log('from mus', toy);
      state.toy = toy;
      console.log('state toy', state.toy);
    },
    createToy(state, { toy }) {
      console.log('mutation toy', toy);
      state.toy = toy;
      console.log('state create toy', state.toy);
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(entity => entity._id === toy._id);
      state.toys.splice(idx, 1, toy);
    },
    addNewToy(state, { toy }) {
      console.log('new toy from mutation', state.toys);
      state.toys.unshift(toy);
    },
  },
  actions: {
    async loadToys({ commit }) {
      const toys = await toyService.query();
      console.log('toys store', toys);
      commit({ type: 'setToys', toys });
    },
    async setFilterBy({ commit }, { filterBy }) {
      const toys = await toyService.query(filterBy);
      commit({ type: 'setToys', toys });
    },
    removeToy({ commit }, { id }) {
      console.log('from action', id);
      toyService.removeToy(id).then(() => {
        commit({ type: 'removeToy', id });
      });
    },
    getToy({ commit }, { toyId }) {
      console.log(toyId);
      toyService.getToy(toyId).then(currToy => {
        const toy = JSON.parse(JSON.stringify(currToy));

        commit({ type: 'getToy', toy });
      });
    },
    updateToy({ commit }, { toy }) {
      let updatedToy = JSON.parse(JSON.stringify(toy));
      console.log('toy form store', updatedToy);
      return toyService.updateToy(updatedToy).then(toy => {
        commit({ type: 'updateToy', toy });
        // console.log('updated fgfdgdfg', toy);
      });
    },
    addNewToy({ commit }, { toy }) {
      let newToy = JSON.parse(JSON.stringify(toy));
      console.log('toy form new', newToy);
      try {
        return toyService.postNewToy(newToy).then(toy => {
          console.log('new toy', toy);
          commit({ type: 'addNewToy', toy });
        });
      } catch (ex) {
        console.log('ex', ex);
      }
    },
  },

  getters: {
    toysToDisplay({ toys }) {
      return JSON.parse(JSON.stringify(toys));
      // return toys;
    },
    toyLabels(state) {
      return state.labels;
    },
    getToy(state) {
      return JSON.parse(JSON.stringify(state.toy));
    },
  },

  modules: {},
});

export default store;
