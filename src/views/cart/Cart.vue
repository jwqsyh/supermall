<!-- 购物车页面 -->
<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartGetLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import CartList from "./childComps/CartList";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,

      CartList
    },
    computed: {
      ...mapGetters(['cartGetLength'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
    background-color: #fff;
    /*z-index: 9;*/
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
