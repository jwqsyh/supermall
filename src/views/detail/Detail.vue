<template>
  <div>商品id：{{iid}}</div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        iid: null
      }
    },
    activated() {
      console.log(this.$route.params.iid);
      this.iid = this.$route.params.iid
    }
  }
</script>

<style scoped>

</style>
