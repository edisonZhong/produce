<!--员工信息-->
<template>
  <div id="page">
    <!-- 员工信息 -->
    <div id="header">
      <div class="h-top">
        <mt-search v-model="value" placeholder="输入关键字"></mt-search>
        <p class="seach" @click="handleSeach">搜索</p>
      </div>
      <div class="h-bottom">
        <p class="number-list">序号</p>
        <p class="data-list">姓名</p>
        <p class="data-list">客户工号</p>
        <p class="data-list">入职日期</p>
      </div>
      <img :src="imgCut" alt />
    </div>

    <mescroll-vue id="main" ref="mescroll" :up="mescrollUp" @init="mescrollInit">
			<ul style="height: 100%;width: 100%;">
        <li v-for="(item,index) in dataList" :key="index">
          <p class="number-list">{{index+1}}</p>
          <p class="data-list">{{item.employeeName}}</p>
          <p class="data-list">{{item.employeeNo}}</p>
          <p class="data-list">{{item.entryAt}}</p>
        </li>
      </ul>
		</mescroll-vue>
    <TabBar></TabBar>
    <div style="position: fixed;right: .1rem;bottom: 2rem">
      <div v-if='imgFlag'>
          <img style="position: absolute;right: .7rem;top: -1rem;" :src="enterUrl" @click="handlePushEnter" alt="">
         <img style="position: absolute;right: 1.1rem;bottom: -.3rem;" :src="liveUrl" @click="handleLive" alt="">
        </div>
        <img :src="flag?removeUrl:imgUrl" @click="handleImg" alt=""/>
    </div>
  </div>
</template>

<script>
import TabBar from "./TabBar";
import { listData } from "../../server/employee";

import MescrollVue from 'mescroll.js/mescroll.vue'
import "mescroll.js/mescroll.min.css";
export default {
  name: "employee",
  components: { TabBar,
  MescrollVue
   },
  data() {
    return {
       mescroll: null, // mescroll实例对象
       mescrollUp: { // 上拉加载的配置.
          callback: this.getList,
          htmlNodata: '<p class="upwarp-nodata">到底啦~~~</p>',
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
      dataList: [],
      imgFlag:true,
	    flag:true,
      value: "",
      imgUrl: require("@/assets/img/Group.png"),
      enterUrl:require("@/assets/img/enter.png"),
      liveUrl:require("@/assets/img/live.png"),
      removeUrl:require("@/assets/img/remove.png"),
      imgCut: require("@/assets/img/cutOff.png"),
      imgF:require("@/assets/img/jiantou.png"),
      pages:{
        page:1,
        size:50
      }
    };
  },
  created() {

  },
  mounted() {
  },
  methods: {
     mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    handleSeach(){
       let searchList = []
       const that = this
      listData({
        page: this.pages.page,
        limit: this.pages.size,
        searchStr:this.value
      }).then(e => {
        // console.log(page.num);
        if (e.data.code == 200) {
          this.searchList=e.data.data.list
          this.dataList=this.searchList
        }
      });
    },
    getList(page, mescroll) {
    const that = this
      listData({
        page: page.num,
        limit: page.size,
        searchStr:this.value
      }).then(e => {
        // console.log(page.num);
        if (e.data.code == 200) {
          var arr = e.data.data.list
           let data = page.num == 1 ? [] : this.dataList;
           this.dataList = this.dataList.concat(arr)
          //  console.log(this.dataList);
           this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
        }
      });
    },
  //   upCallback(){
  //     var that = this;
  //     that.num = page.page
  //     that.getList(that.num);
  // },
    handleImg() {
      this.flag=!this.flag
      this.imgFlag=!this.imgFlag
    },
    handlePushEnter(){
      localStorage.removeItem('employeeName')
      localStorage.removeItem('customerEmployeeNo')
      this.$router.push({ path: "/AddEmployee" });
    },
    handleLive(){
      this.$router.push({ path: "/leaveEmployee/id" });
    },
  }
};
</script>

<style lang="less" scoped>
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
.number-list {
  text-align: center;
  width: 13%;
}
.data-list {
  text-align: center;
  width: 29%;
}
#page {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  #header {
    width: 100%;
    height: 2.48rem;
    background: #fff;
    position: fixed;
    top: 0;
    bottom: 1rem;
    left: 0;
    right: 0;
    display: flex;
    background: #fff;
    z-index: 10;
    flex-direction: column;
    font-size: 0.24rem;
    padding: .1rem;
    box-sizing: border-box;
    .img-cut {
      position: absolute;
      top: 2.04rem;
      left: 0;
      right: 0;
      width: 100%;
      height: 0.44rem;
    }
    // box-shadow: .22rem .22rem .22rem rgba(0, 0, 0, .1);
    .h-top {
      height: 1.04rem;
      width: 100%;
      img {
        position: absolute;
        top: 0.5rem;
        padding: 0 0.3rem;
      }
      .seach {
        width: 0.9rem;
        line-height: 1.2rem;
        margin-left: 0.3rem;
        color: rgba(187, 192, 198, 1);
        font-size: 0.28rem;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0.2rem;
      }
    }
    .h-bottom {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 1rem;
      padding-left: 0.15rem;
      box-sizing: border-box;
    }
  }
  #main {
    position: absolute;
    top: 2rem;
    bottom: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    left: 0;
    right: 0;
    margin-bottom: 1rem;
    padding: .1rem;
    box-sizing: border-box;
    ul {
      li {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid rgba(220, 223, 230, 1);
      }
    }
  }
}
</style>
