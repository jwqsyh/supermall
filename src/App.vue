<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <min-tab-bar/>
  </div>
</template>

<script>
  import MinTabBar from "./components/content/mainTabbar/MinTabBar";

  export default {
    name: 'App',
    components: {
      MinTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";

</style>
