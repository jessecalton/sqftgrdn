import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    width: 0,
    height: 0,
    zip: null,
    hardiness: null,
    nursery: [
      {
          name: "Asparagus",
          id: 1,
          image: require("../assets/svg/asparagus.svg"),
      },
      {
          name: "Broccoli",
          id: 2,
          image: require("../assets/svg/broccoli.svg"),
      },
      {
          name: "Cabbage",
          id: 3,
          image: require("../assets/svg/cabbage.svg"),
      },
      {
          name: "Cucumber",
          id: 4,
          image: require("../assets/svg/cucumber.svg"),
      },
      {
          name: "Eggplant",
          id: 5,
          image: require("../assets/svg/eggplant.svg"),
      },
      {
          name: "Onion",
          id: 6,
          image: require("../assets/svg/onion.svg"),
      },
      {
          name: "Squash",
          id: 7,
          image: require("../assets/svg/squash.svg"),
      },
      {
          name: "Tomato",
          id: 7,
          image: require("../assets/svg/tomato.svg"),
      },
    ],
    garden: [
    ],
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
    },
    setGarden(state, payload) {
      state.garden = payload
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
