<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="backScroll"
            :pull-up-load="true"
            @pullingUp="backPullingUp">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
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
  import {debounce} from 'common/utils'

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
        isShow: false,
        tabOffsetTop: 0,
        isFixed: false,
        scrollY: 0
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
    activated: function () {
      this.$refs.scroll.scrollTop(0, this.scrollY, 0)
      this.$refs.scroll.refresh()
      // console.log('acticated-------'+this.scrollY);

    },
    deactivated() {
      this.scrollY = this.$refs.scroll.getScrollY()
      // console.log('deacticated------'+this.scrollY);
    },
    mounted() {
      // 1.监听GoodsListItem中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('ItemImgLoad', () => {
        // if (this.$refs.scroll != null)
        refresh()
      })
      // console.log(this.$refs.tabControl.$el.offsetTop);

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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTop(0, 0)
      },
      backScroll(position) {
        // console.log(position);
        // 1.判断BackTop是否显示
        this.isShow = (-position.y) > 1000

        // 2.决定tabControl是否吸顶(position:fiexd)
        this.isFixed = (-position.y) > this.tabOffsetTop
      },
      backPullingUp() {
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        // 获取tabControl的offsetTop
        // 所有的组件都有$el属性：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 1;*/
  }
  .content {
    position: absolute;

    overflow-y: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /*.fixed {*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
</style>
