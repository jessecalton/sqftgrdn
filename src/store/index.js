import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    width: 0,
    height: 0,
    zip: null,
    hardiness: null
  },
  mutations: {
    setWidth(state, payload) {
      state.width = payload;
    },
    setHeight(state, payload) {
      state.height = payload;
    },
    setZip(state, payload) {
      state.zip = payload;
    },
    setHardiness(state, payload) {
      state.hardiness = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
