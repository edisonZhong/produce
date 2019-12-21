<!--选择业务区-->
<template>
  <div style="position: relative;height:100%">
    <div class="header">
           <!-- <input placeholder="输入关键字" class="input-seach" v-model="value"/>
           <img :src='imgUrl' alt=""/> -->
           <mt-search v-model="value" placeholder="搜索"></mt-search>
           <p class="seach">搜索</p>
    </div>
  <div
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
    </div>

     <!-- <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
			     
			</mescroll-vue> -->
  </div>
</template>

<script>
import Mescroll  from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default {
  name: "selectService",
  components:{Mescroll },
  data() {
    return {
      imgUrl: require("@/assets/img/seach.png"),
      value: "",
      count: 0,
      list: [],
      mescroll:null,
			// mescrollDown:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: { // 上拉加载的配置.
        callback: this.getData, 
      },
      dataList: [] // 列表数据
    };
  },
 created() {
    this.getData() 
  },
  mounted(){
    this.mescroll=new Mescroll(this.$refs.mescroll,{
      // down:{
      //   callback:this.downCallback
      // },
      up:{
        user:true,
        callback:this.getData(),
        noMoreSize:5,
        htmlNodata:'<p class="upwarp-nodata">暂无更多数据---</p>'
      },
      empty:{
        warpId:'mescroll',
        tip:'暂无相关数据哦~~~'
      }
    })
    up:{
      user:true;

    }
  },
  methods: {
    getData(page){
      const that = this
      // dataList({}).then(e=>{
      //   console.log(e);
      //   var datas=e.data.data
      //   if(datas.code==1){
      //       this.dataList=e.data.data
      //       if(page.page==1){
      //         that.dataList=[]
      //       }
      //       var data=e.data.data
      //       if(data&&data.length>0){
      //         that.dataList=that.dataList.concat(data)
      //       }
      //   }
      //   that.$nextTick(()=>{
      //     that.mescroll.endSuccess(data.length)
      //   })
      // })
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