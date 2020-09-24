import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bots: []
  },

  getters: {
    getBots: state => state.bots
  },

  mutations: {
    addBot(state, bot) {
      state.bots.push(bot)
    },
    removeBot(state, index) {
      state.bots.splice(index, 1)
    },
    editBot(state, { index, bot }) {
      Vue.set(state.bots, index, bot)
    }
  },

  actions: {
    addBot(context, bot) {
      context.commit('addBot', bot)
    },
    removeBot(context, index) {
      context.commit('removeBot', index)
    },
    editBot(context, { index, bot }) {
      context.commit('editBot', { index, bot })
    }
  }
})
