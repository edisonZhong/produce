<!--选择业务区-->
<template>
  <div style="position: relative;height:100%">
    <div class="header">
           <!-- <input placeholder="输入关键字" class="input-seach" v-model="value"/>
           <img :src='imgUrl' alt=""/> -->
           <mt-search v-model="value" placeholder="搜索"></mt-search>
           <p class="seach">搜索</p>
    </div>
  <!-- <div
      ref="mescroll"
      class="mescroll"
      id='mescroll'
    >
    <div>
        <div class="main">
          <ul id="dataList">
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
            <li class="data-li" >
            1
            </li>
        </ul>
      </div>
    </div>
    </div> -->
  </div>
</template>

<script>
// import MeScroll from 'mescroll.js'
// import 'mescroll.js/mescroll.min.css'
export default {
  name: "selectService",
  // components:{MeScroll},
  data() {
    return {
      imgUrl: require("@/assets/img/seach.png"),
      value: "",
      count: 0,
      list: [],
      // mescroll:null
    };
  },
 created() {
    this.getData() 
  },
  methods: {
    getData(){
      const that = this
      
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  position: absolute;
  top: 1.04rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 .3rem;
  box-sizing: border-box;
  .data-li {
    height: 0.88rem;
    line-height: 0.88rem;
    border-bottom: 1px solid rgba(220,223,230,1);
  }
}
.seach {
  width: 0.9rem;
  line-height: 1.04rem;
  margin-left: 0.3rem;
  color: rgba(187, 192, 198, 1);
  font-size: 0.28rem;
  text-align: center;
  position: absolute;
    top: 0;
    right: .2rem;
}
.mescroll{
  position: fixed;
  top:0;
  bottom: 0;
  height:auto;
}
.input-seach {
  background: rgba(246, 248, 250, 1);
  height: 0.72rem;
  width: 100%;
  border-radius: 4px;
}
.header {
  // padding: 0.3rem;
  // display: flex;
  height: 1.04rem;
  width: 100%;
  // box-sizing: border-box;
  // position: absolute;
  // top: 0;
  // width: 100%;
  img {
    position: absolute;
    top: 0.5rem;
    padding: 0 0.3rem;
  }
}
.mint-indicator-wrapper {
  background: rgba(0, 0, 0, 0);
}
</style>