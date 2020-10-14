import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    binanceSymbol: "BTCUSDT",
    tableElements: []
  },

  mutations: {
    storeBinanceSymbol(state, payload) {
      state.binanceSymbol = payload
    },

    storeTableElements(state, payload) {
      state.tableElements = payload
    },

    updateTableElements(state, payload) {

      for (let i in payload.bids) {
        let index = state.tableElements.bids.findIndex((obj) => obj[0] === payload.bids[i][0])

        if (index !== -1) {
          state.tableElements.bids.splice(index, 1, payload.bids[i])
        }
      }

      for (let i in payload.asks) {
        let index = state.tableElements.asks.findIndex((obj) => obj[0] === payload.asks[i][0])

        if (index !== -1) {
          state.tableElements.asks.splice(index, 1, payload.asks[i])
        }
      }
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
