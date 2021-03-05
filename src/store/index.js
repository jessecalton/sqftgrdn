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
          spacing: 1,
          height: "1 to 5 inches",
          editableSeason:"Spring, early summer",
          weeksfromSeedsToHarvest:"2 to 3 yrs.",
          sprucePage: "https://www.thespruce.com/how-to-plant-and-grow-asparagus-1402814"
      },
      {
          name: "Broccoli",
          id: 2,
          image: require("../assets/svg/broccoli.svg"),
          spacing: 1,
          height: "18 to 24 inches",
          editableSeason:"Spring, Fall",
          weeksfromSeedsToHarvest:"18",
          sprucePage: "https://www.thespruce.com/growing-broccoli-plants-in-the-vegetable-garden-1403457"
      },
      {
          name: "Cabbage",
          id: 3,
          image: require("../assets/svg/cabbage.svg"),
          spacing: 1,
          height: "12 to 18 inches",
          editableSeason:"Spring, Fall",
          weeksfromSeedsToHarvest:"16",
          sprucePage: "https://www.thespruce.com/growing-and-caring-for-cabbage-plants-1402815"
      },
      {
          name: "Cucumber",
          id: 4,
          image: require("../assets/svg/cucumber.svg"),
          spacing: 1,
          height: "12 to 18 inches",
          editableSeason:"Spring, Fall",
          weeksfromSeedsToHarvest:"16",
          sprucePage: "https://www.thespruce.com/growing-and-caring-for-cabbage-plants-1402815"
      },
      {
          name: "Eggplant",
          id: 5,
          image: require("../assets/svg/eggplant.svg"),
          spacing: 2,
          height: "vine",
          editableSeason:"Summer",
          weeksfromSeedsToHarvest:"9",
          sprucePage: "https://www.thespruce.com/growing-cucumbers-of-all-shapes-and-sizes-1403458"
      },
      {
          name: "Onion",
          id: 6,
          image: require("../assets/svg/onion.svg"),
          spacing: 16,
          height: "20",
          editableSeason:"Summer",
          weeksfromSeedsToHarvest:"1 to 2yrs",
          sprucePage: "https://www.thespruce.com/growing-onions-1403447"
      },
      {
          name: "Squash",
          id: 7,
          image: require("../assets/svg/squash.svg"),
          spacing: 1,
          height: "vine",
          editableSeason:"Summer to Fall",
          weeksfromSeedsToHarvest:"12",
          sprucePage: "https://www.thespruce.com/how-to-grow-pumpkins-1403469"
      },
      {
          name: "Tomato",
          id: 7,
          image: require("../assets/svg/tomato.svg"),
          spacing: 1,
          height: "3' (bush) 6' (vine)",
          editableSeason:"Summer",
          weeksfromSeedsToHarvest:"17",
          sprucePage: "https://www.thespruce.com/growing-tomatoes-1403296"
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
