<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="backScroll"
            :pull-up-load="true"
            @pullingUp="backPullingUp">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showTitle"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShow: false
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      //流行
      this.getHomeGoods('pop')
      //新款
      this.getHomeGoods('new')
      //精选
      this.getHomeGoods('sell')
    },
    computed: {
      showTitle() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      },
      backClick() {
        this.$refs.scroll.scrollTop(0, 0)
      },
      backScroll(position) {
        // console.log(position);
        this.isShow = (-position.y) > 1000
      },
      backPullingUp() {
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()
      },

      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(result => {
          // console.log(result);
          this.banners = result.data.banner.list
          this.recommends = result.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(result => {
          this.goods[type].list.push(...result.data.list)
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
      },
    },

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 1;
  }
  .content {
    position: absolute;
    /*height: 300px;*/
    /*background-color: red;*/
    /*overflow-y: hidden;*/
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
