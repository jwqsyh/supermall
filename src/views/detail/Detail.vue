<!-- 详情页 -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="navBar"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="navBarScroll">
<!--      <ul>-->
<!--        <li v-for="item in $store.state.cartList">-->
<!--          {{item}}-->
<!--        </li>-->
<!--      </ul>-->
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommendInfo"></goods-list>
    </scroll>
    <detail-bottom-bar @clickToCart="clickToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {itemImgLentenerMinins, backTopMixin} from "common/mixins";
  import {debounce} from "../../common/utils";

  export default {
    name: "Detail",
    components: {
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        navBarLocation: [],
        navBarDebounce: null,
        currentIndex: 0,
        // isShowBackTop: false
      }
    },
    mixins: [itemImgLentenerMinins,backTopMixin],
    created() {
      // 1.保存传入进来的iid
      // console.log(this.$route.params.iid);
      this.iid = this.$route.params.iid

      // 2.根据iid获取商品详情数据
      getDetail(this.iid).then(result => {
        // 1.获取轮播图图片数据
        console.log(result);
        const data = result.result
        this.topImage = result.result.itemInfo.topImages
        // console.log(this.topImage);

        // 2.整合商品所需数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.获取商品详情页数据
        this.detailInfo = data.detailInfo

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        this.navBarDebounce = debounce(() => {
          this.navBarLocation.push(0)
          this.navBarLocation.push(this.$refs.paramInfo.$el.offsetTop)
          this.navBarLocation.push(this.$refs.commentInfo.$el.offsetTop)
          this.navBarLocation.push(this.$refs.recommendInfo.$el.offsetTop)
          this.navBarLocation.push(Number.MAX_VALUE)

          console.log(this.navBarLocation);
        }, 100)
      })

      // 3.请求推荐数据
      getRecommend().then(result => {
        this.recommends = result.data.list
      })
    },
    mounted() {
      // console.log('detail mounted');
    },
    destroyed() {
      this.$bus.$off('ItemImgLoad', this.itemImageLentener)
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
        this.navBarDebounce()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTop(0, -this.navBarLocation[index]+44, 500)
      },
      navBarScroll(position) {
        // console.log(position);
        // 获取y值
        const positionY = position.y
        let length = this.navBarLocation.length
        for (let i = 0; i < length - 1; i ++) {
        //   if ((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.navBarLocation[i]
        //   && positionY < this.navBarLocation[i + 1]) || (i === length - 1 && positionY >= this.navBarLocation[i]))) {
        //     this.currentIndex = i
        //     console.log(this.currentIndex);
        //     this.$refs.navBar.currentIndex = this.currentIndex
        //   }
          if ((this.currentIndex !== i) && ((-positionY+44) >= this.navBarLocation[i]
                                        && (-positionY+44) < this.navBarLocation[i + 1])) {
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }

        }

        // 判断是否显示backTop
        this.isShowBackTop = (-position.y) > 1000
      },
      clickToCart() {
        // 1.获取购物车需要展示的信息
        const productList = {}
        productList.image = this.topImage[0]
        productList.desc = this.goods.desc
        productList.title = this.goods.title
        productList.price = this.goods.realPrice
        productList.iid = this.iid

        // 2.将商品添加到购物车中
        // this.$store.commit('addCart', productList)
        this.$store.dispatch('addCart', productList)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>
