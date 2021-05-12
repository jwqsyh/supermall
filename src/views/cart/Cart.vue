<!-- 购物车页面 -->
<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartGetLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <!-- 底部结算 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,

      CartList,
      CartBottomBar
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
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
