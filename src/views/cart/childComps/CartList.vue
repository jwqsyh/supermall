<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartGetList"
                    :key="index"
                    :product="item"></cart-list-item>
<!--    li{内容}*150-->
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      CartListItem
    },
    computed: {
      ...mapGetters(['cartGetList'])
    }
  }
</script>

<style scoped>

</style>
