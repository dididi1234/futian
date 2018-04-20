<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',

  components: {

  },


}
</script>

<!--suppress CssUnknownTarget -->
<style lang="less" type="text/less">
  @import "~less/style.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;

}
</style>
