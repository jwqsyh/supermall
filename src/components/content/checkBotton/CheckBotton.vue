<template>
  <div class="cart-check-botton" :class="{check: isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckBotton",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .cart-check-botton {
    border: 2px solid #aaa;
    border-radius: 50%;
  }
  .check {
    border-color: var(--color-high-text);
    background-color: var(--color-high-text);
  }
</style>
