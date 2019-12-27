<template>
  <div id="app">
    <!-- <transition leave-active-class='fadeOut animated' enter-active-class='fadeIn animated'> -->
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <!-- </transition> -->
  </div>
</template>

<script>
  // import allServer from './server/allServer.js'
  export default {
    data() {
      return {}
    },
    created() {

    }
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  #app {
    height: 100%;
  }
  .h-top{
    .seach{
      color:#26a2ff;
    }
  }
  .mint-msgbox {
    width: 70% !important;
    border-radius: 10px;

    .mint-msgbox-message {
      font-size: 14px;
    }

    .mint-msgbox-confirm {
      font-size: 16px;
    }
  }
</style>
