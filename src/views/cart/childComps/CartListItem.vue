<template>
  <div id="cart-list-item">
    <div class="item-selector">
      <check-botton :is-check="productList.checked" @click.native="checkedClick"></check-botton>
    </div>
    <div class="item-img">
      <img :src="productList.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{productList.title}}</div>
      <div class="item-desc">{{productList.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">¥{{productList.price}}</div>
        <div class="item-count right">×{{productList.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckBotton from "components/content/checkBotton/CheckBotton";

  export default {
    name: "CartListItem",
    props: {
      productList: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckBotton
    },
    methods: {
      checkedClick() {
        this.productList.checked = !this.productList.checked
      }
    }
  }
</script>

<style scoped>
  #cart-list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border: 1px solid #ccc;
  }
  .item-selector {
    /*width: 14%;*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 88px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .item-bottom {
    margin-top: 10px;
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
  }
  .item-bottom .item-price {
    color: orangered;
  }

</style>
