<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='加入购物车成功', time=2000) {
        this.message = message
        this.isShow = true

        setTimeout(() => {
          this.message = ''
          this.isShow = false
        }, time)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 10px 15px;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    z-index: 100;

    color: #fff;
    background-color: rgba(0, 0, 0, .6);
  }
</style>
