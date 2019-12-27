<template>
  <div id="app" :key='appkey'>
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
  data(){
       return{
         appkey:1
       }
   },
   created(){

  },
  watch:{
    '$route':function(newu,oldu){
      this.appkey = new Date().getTime();
    }
  }
}

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

#app{
  height: 100%;
}
</style>
