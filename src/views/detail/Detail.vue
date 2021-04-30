<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="detail-content" ref="scroll"
            :probe-type="3">
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";

  import {getDetail, Goods, Shop} from "network/detail";

  export default {
    name: "Detail",
    components: {
      Scroll,

      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        iid: null,
        topImage: [],
        goods: {},
        shop: {}
      }
    },
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
      })
    }
  }
</script>

<style scoped>
  .detail-content {
    position: absolute;

    overflow-y: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
