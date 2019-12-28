<!--员工信息-->
<template>
  <div id="page">
    <!-- 员工信息 -->
    <div id="header">
      <div class="h-top">
        <mt-search 
        @focus.native.capture="handleCommentFocus" 
        v-model="value" :placeholder="placeholder" @keyup.native.enter="search(value)"></mt-search>
        <p class="seach" @click="handleSeach">搜索</p>
      </div>
      <div class="h-bottom">
        <p class="number-list">序号</p>
        <p class="data-list" style="width:22%;margin-left: .3rem">姓名</p>
        <p class="data-list" style="width:30%;">客户工号</p>
        <p class="data-list" style="width:38%;">入职日期</p>
      </div>
    </div>

    <mescroll-vue
      id="main"
      :down="mescrollDown"
      ref="mescroll"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <ul style="height: 100%;width: 100%;">
        <li v-for="(item,index) in dataList" :class="[item.status==2?class1:class2]" :key="index">
          <p class="number-list">{{index+1}}</p>
          <p class="data-list" style="width:22%;margin-left: .3rem">{{item.employeeName}}</p>
          <p class="data-list" style="width:30%;">{{item.customerEmployeeNo}}</p>
          <p class="data-list" style="width:38%;">{{item.entryAt}}</p>
        </li>
      </ul>
    </mescroll-vue>
    <TabBar></TabBar>
    <div style="position: fixed;right: 0.3rem;bottom: 2rem;">
      <!-- <transition name="mybox"> -->
        <div v-if="imgFlag">
          <span class="enter-img" @click="handlePushEnter">入职</span>
          <span class="live-img" @click="handleLive">离职</span>
        </div>
      <!-- </transition> -->
      <img style="width:1rem;" :src="flag?removeUrl:imgUrl" @click="handleImg" alt />
    </div>
  </div>
</template>

<script>
import TabBar from "./TabBar";
import { listData } from "../../server/employee";

import MescrollVue from "mescroll.js/mescroll.vue";
import "mescroll.js/mescroll.min.css";
export default {
  name: "employee",
  components: { TabBar, MescrollVue },
  data() {
    return {
      class1: "class1",
      class2: "class2",
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        callback: this.downCallBack,
        clearEmptyId: "main",
        isBoth: false,
        isBounce: true,
        inOffsetRate :1
      },
      mescrollUp: {
        // 上拉加载的配置.
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
        htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      },
      dataList: [],
      imgFlag: false,
      flag: false,
      value: "",
      imgUrl: require("@/assets/img/Group.png"),
      removeUrl: require("@/assets/img/remove.png"),
      pages: {
        page: 1,
        size: 50
      },
      placeholder:'输入姓名或客户工号'
    };
  },
  created() {},
  
  mounted() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    })
  },
  // 监听input
  watch: {
    value: function (newval,oldval) {
      if (this.value == "") {
        this.placeholder='输入姓名或客户工号'
        this.handleSeach()
      }else{
        this.placeholder=''
      }
    }
  },
  methods: {
    handleCommentFocus(){
      this.placeholder=''
    },    
    //搜索列表数据
    search() {
      this.handleSeach();
    },
    handleSeach() {
      let searchList = [];
      const that = this;
      listData({
        page: this.pages.page,
        limit: this.pages.size,
        searchStr: this.value
      }).then(e => {
        if (e.data.code == 200) {
          this.searchList = e.data.data.list;
          this.dataList = this.searchList;
        }
      });
    },
     //下拉刷新上拉加载更多初始化
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    //上拉的回调
    downCallBack(mescroll) {
      setTimeout(function() {
        mescroll.endSuccess();
      }, 1500);
    },
    getList(page, mescroll) {
      const that = this;
      listData({
        page: page.num,
        limit: page.size,
        searchStr: this.value
      }).then(e => {
        if (e.data.code == 200) {
          var arr = e.data.data.list;
          let data = page.num == 1 ? [] : this.dataList;
          this.dataList = this.dataList.concat(arr);
          //  console.log(this.dataList);
          this.$nextTick(() => {
            this.mescroll.endSuccess(arr.length);
          });
        }
      });
    },
    //点击按钮入职/离职的显示和隐藏
    handleImg() {
      this.flag = !this.flag;
      this.imgFlag = !this.imgFlag;
    },
    //跳转到入职页面
    handlePushEnter() {
      localStorage.removeItem("employeeName");
      localStorage.removeItem("customerEmployeeNo");
      this.$router.push({ path: "/addEmployee" });
    },
    //跳转到离职页面
    handleLive() {
      this.$router.push({ path: "/leaveEmployee/id" });
    }
  }
};
</script>

<style lang="less" scoped>
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.number-list {
  text-align: center;
  width: 10%;
}
.data-list {
  text-align: left;
  width: 34%;
}
#page {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  #header {
    width: 100%;
    height: 2.04rem;
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
    padding: 0.1rem;
    padding-bottom: 0;
    box-sizing: border-box;
    .img-cut {
      position: absolute;
      top: 2.04rem;
      left: 0;
      right: 0;
      width: 100%;
      height: 0.44rem;
    }
    .h-top {
      height: 1.4rem;
      width: 100%;
      border-bottom: 0.5px solid #f2f2f2;
      img {
        position: absolute;
        top: 0.5rem;
        padding: 0 0.3rem;
        box-sizing: border-box;
      }
      .seach {
        width: 0.9rem;
        line-height: 1.2rem;
        margin-left: 0.3rem;
        color: #eb9f4b;
        font-size: 0.32rem;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0.2rem;
        // font-size: 16px;
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
      font-size: 14px;
      color: #999;
      border-bottom: 0.5px solid #f2f2f2;;
    }
  }
  #main {
    -webkit-overflow-scrolling:touch;
    position: absolute;
    top: 2.04rem;
    bottom: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
    // width: 100%;
    left: 0;
    right: 0;
    height:100%;
    margin-bottom: 1rem;
    padding: 0 0.1rem 0.1rem;
    box-sizing: border-box;
    ul {
      .class2 {
        display: flex;
        justify-content: space-around;
        align-items: center;
        // width: 100%;
        height: 1rem;
        padding-left: 0.15rem;
        border-bottom: 0.5px solid #f2f2f2;
      }
      .class1 {
        display: flex;
        justify-content: space-around;
        align-items: center;
        // width: 100%;
        height: 1rem;
        padding-left: 0.15rem;
        color: #999;
        border-bottom: 0.5px solid #f2f2f2;
      }
    }
  }
}
.enter-img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  font-size: 16px;
  display: inline-block;
  position: absolute;
  background: #eb9f4b;
  right: 0.9rem;
  top: -1rem;
}
.live-img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  font-size: 16px;
  display: inline-block;
  position: absolute;
  background: #eb9f4b;
  right: 1.3rem;
  bottom: -0.25rem;
}
</style>
