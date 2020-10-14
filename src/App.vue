<template>
  <div id="app">
    <div class="header-wrapper">
      <span class="link" :class="{active: currentPage === 'binance'}" @click="currentPage = 'binance'">
        Binance
      </span>
      <span class="link" :class="{active: currentPage === 'dropdown'}" @click="currentPage = 'dropdown'">
        Dropdown
      </span>
    </div>
    <div class="binance-body-wrapper" v-if="currentPage === 'binance'">
      <span> {{ binanceSymbol }} </span>
      <div class="table-type">
        <span>BIDS</span>
        <span>ASKS</span>
      </div>
      <div class="binance-tables-wrapper">
        <custom-table :table-elements="tableElements.bids" />
        <custom-table :table-elements="tableElements.asks"/>
      </div>
    </div>
    <div class="dropdown-body-wrapper" v-else>
      <custom-dropdown />
      <custom-dropdown />
      <custom-dropdown />
      <custom-dropdown />
      <custom-dropdown />
    </div>
  </div>
</template>

<script>
const axios = require('axios')

import CustomTable from "@/components/CustomTable";
import CustomDropdown from "@/components/CustomDropdown";

export default {
  name: 'App',

  data () {
    return {
      currentPage: "binance",
      socket: null
    }
  },

  components: {
    CustomDropdown,
    CustomTable
  },

  computed: {
    binanceSymbol () {
      return this.$store.state.binanceSymbol
    },

    tableElements () {
      return this.$store.state.tableElements
    },

    webSocketUrl () {
      return "wss://stream.binance.com:9443/ws/" + this.binanceSymbol.toLowerCase() + "@depth@1000ms"
    }
  },

  watch: {
    binanceSymbol () {
      this.getBinanceTable()
    }
  },

  methods: {
    getBinanceTable () {
      let params = {
        symbol: this.binanceSymbol,
        limit: 500
      }

      axios.get("https://api.binance.com/api/v3/depth", { params }).then((response) => {
        let payload = {
          bids: response.data.bids,
          asks: response.data.asks
        }

        this.$store.commit("storeTableElements", payload)

        if (this.socket !== null) {
          this.socket.close()
        }

        this.socket = new WebSocket(this.webSocketUrl)
        this.connect(this.$store)
      }).catch((error) => {
        console.log(error)
      })
    },

    connect (store) {
      this.socket = new WebSocket(this.webSocketUrl)

      this.socket.onmessage = function (event) {
        let payload = {
          bids: JSON.parse(event.data).b,
          asks: JSON.parse(event.data).a
        }

        store.commit("updateTableElements", payload)
      }

      this.socket.onclose = function () {
        console.log("disconnect")
      }
    }
  },

  created() {
    this.connect(this.$store)
    this.getBinanceTable()
  }
}
</script>

<style lang="scss">
  @import "./assets/style/style";

  .header-wrapper {
    width: 100%;
    padding: 10px 30px;
    background: #4d5bdf;
    display: flex;
    color: white;
    font-size: 20px;
    font-weight: 600;
    justify-content: space-around;
    box-sizing: border-box;
  }

  .binance-body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 30px;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .link {
    cursor: pointer;
  }

  .link:hover {
    filter: brightness(90%);
  }

  .dropdown-body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 30px;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .binance-tables-wrapper {
    margin-top: 10px;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    box-sizing: border-box;
    overflow: hidden;
  }

  .table-type {
    margin-top: 30px;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  .active {
    border-bottom: 2px solid white;
  }
</style>
