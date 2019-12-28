<!--选择服务客户名称-->
<template>
  <div style="position: relative;height:100%">
    <div class="header">
      <div class="h-top">
          <mt-search @focus.native.capture="handleCommentFocus" v-model="value" :placeholder="placeholder" @keyup.native.enter="search(value)"></mt-search>
          <p class="seach" @click="handleSeach">搜索</p>
      </div>
    </div>
   <mescroll-vue id="main" ref="mescroll" :down='mescrollDown' :up="mescrollUp" @init="mescrollInit">
        <ul style="height: 50px;width: 100%;">
            <li v-for="(item,index) in dataList" :key="index" @click="handleLink(item.id,item.customerName)">
            {{item.customerName}}
          </li>
        </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import "mescroll.js/mescroll.min.css";
import { Indicator } from "mint-ui";
import { selectType } from "../../server/employee";
export default {
  name: "client",
  components:{MescrollVue },
  data() {
    return {
      imgUrl: require("@/assets/img/seach.png"),
      value: "",
      count: 0,
      mescroll:null,
       mescrollDown:{ //下拉刷新
        callback:this.downCallBack,
        clearEmptyId:"main",
						isBoth: false, 
						isBounce: true, 
         },
      mescrollUp: { // 上拉加载的配置.
          callback: this.getList,
          htmlNodata: '<p class="upwarp-nodata">  </p>',
          noMoreSize: 5, 
          page: {
            num: 0,
            size: 50,
            total: 0
          },
          empty: {
          warpId: "main", 
          icon: "./static/mescroll/mescroll-empty.png", 
          tip: "暂无相关数据~" //提示
          },
        htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
      },
      pages: {
        page: 1,
        size: 50,
        total: 0
      },
      dataList: [], // 列表数据
      placeholder:'请输入关键字'
    };
  },
  // 监听input
   watch: {
    value: function (newval,oldval) {
      if (this.value == "") {
        this.placeholder='请输入关键字'
        this.handleSeach()
      }else{
        this.placeholder=''
      }
    }
  },
  methods: {
  //清空input
  handleCommentFocus(){
      this.placeholder=''
    },
    //搜索列表
    search(){
      this.handleSeach()
    },
     handleSeach(){
       let searchList = []
       const that = this
      selectType({
        page: this.pages.page,
        limit: this.pages.size,
        customerName:this.value
      }).then(e => {
        if (e.data.code == 200) {
          this.searchList=e.data.data.list
          this.dataList=this.searchList
        }
      });
    },
    //初始化上拉加载
    mescrollInit (mescroll) {
      this.mescroll = mescroll  
    },
    //下拉刷新的回调
    downCallBack(mescroll){
        setTimeout(function(){
        mescroll.endSuccess()
      },1500);
    },
    getList(page, mescroll) {
    const that = this
      selectType({
        page: page.num,
        limit: page.size,
        customerName:this.value
      }).then(e => {
        if (e.data.code == 200) {
          var arr = e.data.data.list
           let data = page.num == 1 ? [] : this.dataList;
           this.dataList = this.dataList.concat(arr)
           this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
        }
      });
    },
    handleLink(id,customerName){
      localStorage.setItem("customerName", JSON.stringify(customerName))
      localStorage.setItem("customerId", JSON.stringify(id))
      this.$router.push({
        path:'/AddEmployee',
        query:{
          customerId:id,
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
#main {
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
  li {
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 16px;
    border-bottom: 0.5px solid #f2f2f2;;
  }
}
.input-seach {
  background: rgba(246, 248, 250, 1);
  height: 0.72rem;
  width: 100%;
  border-radius: 4px;
}
.mint-search {
    width: 100%;
    height: 1.04rem;
}
.header {
  height: 1.04rem;
  width: 100%;
  position: fixed;
  z-index: 10;
  padding: .1rem;
  background: #fff;
  box-sizing: border-box;
  .h-top {
      height: 1.14rem;
      width: 100%;
      border-bottom: 0.5px solid #f2f2f2;
    .seach {
      width: 0.9rem;
      line-height: 1.14rem;
      margin-left: 0.3rem;
      color: #26a2ff !important;
      font-size: 0.32rem;
      text-align: center;
      position: absolute;
      top: 0;
      right: .2rem;
      background: #fff
    }
  }
}
.mint-indicator-wrapper {
  background: rgba(0, 0, 0, 0);
}

 .mescroll-upwarp .upwarp-nodata {
    display: none;
}
</style>