<template>
  <div class="dropdown-wrapper">
    <span class="dropdown-title">DropDown</span>
    <ul class="dropdown">
      <li class="dropdown-label" :class="{activeDropdown: binanceSymbol === 'BTCUSDT'}"
          v-on:click="selectDropdown('BTCUSDT')">
        <span>BTCUSDT</span>
      </li>
      <li class="dropdown-label" :class="{activeDropdown: binanceSymbol === 'BNBBTC'}"
          v-on:click="selectDropdown('BNBBTC')">
        <span>BNBBTC</span>
      </li>
      <li class="dropdown-label" :class="{activeDropdown: binanceSymbol === 'ETHBTC'}"
          v-on:click="selectDropdown('ETHBTC')">
        <span>ETHBTC</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomDropdown",

  computed: {
    binanceSymbol () {
      return this.$store.state.binanceSymbol
    }
  },

  methods: {
    selectDropdown(payload) {
      this.$store.commit("storeBinanceSymbol", payload)
    }
  }
}
</script>

<style lang="scss">

  .dropdown-wrapper:hover > .dropdown {
    visibility: visible;
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    visibility: hidden;
    border: 1px solid #666666;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .dropdown-label {
    cursor: pointer;
    padding: 15px;
    box-sizing: border-box;
    width: 100%;

  }

  .dropdown-label:hover {
    box-sizing: border-box;
    background: #e6e6e6;
  }

  .activeDropdown {
    background: #e6e6e6;
  }

</style>