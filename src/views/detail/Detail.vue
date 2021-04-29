<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-image="topImage"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";

  import {getDetail} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailSwiper,
      DetailNavBar,
      getDetail
    },
    data() {
      return {
        iid: null,
        topImage: []
      }
    },
    created() {
      // 1.保存传入进来的iid
      console.log(this.$route.params.iid);
      this.iid = this.$route.params.iid

      // 2.根据iid获取商品详情数据
      getDetail(this.iid).then(result => {
        // console.log(result);
        this.topImage = result.result.itemInfo.topImages
        console.log(this.topImage);
      })
    }
  }
</script>

<style scoped>

</style>
