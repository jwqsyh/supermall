<template>
  <div class="bottom-bar">
    <div class="bottom-content" >
      <check-botton class="bottom-checked"
                    :is-check="cartListCheck"
                    @click.native="allCheck"></check-botton>
      <span>全选</span>
    </div>
    <div class="center-price">
      合计：{{totalPrice}}
    </div>
    <div class="right-price">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckBotton from "components/content/checkBotton/CheckBotton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckBotton,
    },
    computed: {
      ...mapGetters(['cartGetList']),
      totalPrice() {
        return '¥' + this.cartGetList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      },
      checkLength() {
        return this.cartGetList.filter(item => {return item.checked}).length
      },
      cartListCheck() {
        // 1.使用过滤
        // if (this.cartGetList.length === 0) return false
        // return !(this.cartGetList.filter(item => !item.checked).length)

        // 2.使用find
        if (this.cartGetList.length === 0) return false
        return !this.cartGetList.find(item => !item.checked)

        // 3.使用for循环遍历
        // if (this.cartGetList.length === 0) return false
        // for (let item of this.cartGetList) {
        //   if (!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      allCheck() {
        if (this.cartListCheck) {
          this.cartGetList.forEach(item => item.checked = false)
        } else {
          this.cartGetList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    position: relative;
    display: flex;
    font-size: 14px;
  }

  .bottom-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .bottom-checked {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .center-price {
    margin-left: 30px;
    flex: 1;
  }
  .right-price {
    width: 90px;
    background-color: #f00;
    text-align: center;
    color: #fff;
  }
  .check {
    border-color: var(--color-high-text);
    background-color: var(--color-high-text);
  }
</style>
