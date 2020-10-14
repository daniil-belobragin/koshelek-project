<template>
  <div class="table-wrapper">
    <div class="table-labels">
      <span class="amount">Amount</span>
      <span class="text">Price</span>
      <span class="text">Total</span>
    </div>
    <ul class="table-elements">
      <li class="table-element" v-for="tableElement in tableElements" :key="tableElement.id">
        <span class="amount"> {{ parseFloat(tableElement[0]) }} </span>
        <span class="text"> {{ parseFloat(tableElement[1]) }} </span>
        <span class="text"> {{ Number(tableElement[0] * tableElement[1]).toFixed(8) }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomTable",

  props: {
    tableElements: {
      required: true,
      default: null
    }
  }
}
</script>

<style scoped>

  .table-wrapper {
    display: flex;
    flex-direction: column;
    width: 49%;
    border: 1px solid #666666;
    border-radius: 4px;
  }

  .table-labels {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #666666;
  }

  .text {
    width: 34%;
    text-align: center;
    border-right: 1px solid #666666;
    word-wrap: break-word;
  }

  .text:last-child {
    border-right: none;
  }

  .table-element {
    display: flex;
    text-align: center;
    border-top: 1px solid #666666;
  }

  .table-elements {
    overflow: hidden;
    height: 100%;
  }

  .table-elements:hover {
    overflow-y: scroll;
  }

  .amount {
    width: 32%;
    text-align: center;
    word-wrap: break-word;
    border-right: 1px solid #666666;
  }

  @media screen and (max-width: 425px) {
    .amount {
      display: none;
    }

    .text {
      width: 51%;
    }
  }

  .table-element:first-child {
    border-top: none;
  }

</style>