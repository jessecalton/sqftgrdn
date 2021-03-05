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
    getHardiness(context) {
      const zip = context.state.zip
      fetch(`https://phzmapi.org/${zip}.json`)
        .then(response => response.json())
        .then(data => {
          const zone = parseInt(data.zone.split('')[0])
          context.commit('setHardiness', zone);
        })
    }
  },
  modules: {
  }
})
