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
        <p class="data-list" style="width:1.46rem;margin-left: -.3rem;">姓名</p>
        <p class="data-list" style="width:1.58rem">客户工号</p>
        <p class="data-list" style="width:2.5rem">入职日期</p>
      </div>
    </div>

    <mescroll-vue
      id="main"
      :down="mescrollDown"
      ref="mescroll"
      :up="mescrollUp"
      @init="mescrollInit"
      :autoShowLoading=true
    >
      <ul style="height: 100%;width: 100%;">
        <li v-for="(item,index) in dataList" :class="[item.status==2?class1:class2]" @click="goInfo(item.id)" :key="index">
          <p class="number-list">{{index+1}}</p>
          <p class="data-list" style="width:1.46rem;margin-left: -.3rem;">{{item.employeeName}}</p>
          <p class="data-list" style="width:1.58rem">{{item.customerEmployeeNo}}</p>
          <p class="data-list" style="width:35%;">{{item.entryAt}}</p>
        </li>
      </ul>
    </mescroll-vue>
    <TabBar v-show="hideshow"></TabBar>
    <div style="position: fixed;right: 0.3rem;bottom: 2rem;z-index: 10;" v-show="hideshow">
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
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hideshow: true,  //显示或者隐藏footer
      class1: "class1",
      class2: "class2",
      mescroll: null, // mescroll实例对象
      mescrollDown: {//下拉刷新的配置
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
  created() {
    console.log(this,'thiss');
  },
  mounted() {
    // history.pushState(null, null, document.URL);
    // window.addEventListener('popstate', function () {
    //   history.pushState(null, null, document.URL);
    // })
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })()
    };
  },
  // 监听input
  watch: {
    value: function (newval,oldval) {
      console.log(newval,'oldval');
      if (this.value == "") {
        this.placeholder='输入姓名或客户工号'
        this.handleSeach()
      }else{
        this.placeholder=''
      }
    },
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hideshow = false
      } else {
        this.hideshow = true
      }
    }
  },
  methods: {
    //清空input
    handleCommentFocus(){
      this.placeholder=''
    },
    goInfo(id){
      this.$router.push(`/employeeInfo/${id}`);
    },
    //搜索列表数据
    search() {
      this.handleSeach();
    },
    async handleSeach() {
      let searchList = [];
      const that = this;
      await listData({
        page: this.pages.page,
        limit: this.pages.size,
        searchStr: this.value
      }).then(e => {
        if (e.data.code == 200) {
          that.searchList = e.data.data.list;
          that.dataList = that.searchList;
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
      console.log(1);
      this.flag = !this.flag;
      this.imgFlag = !this.imgFlag;
    },
    //跳转到入职页面
    handlePushEnter() {
      localStorage.removeItem("from_where");
      localStorage.removeItem("from_id");

      localStorage.removeItem("employeeName");
      localStorage.removeItem("customerEmployeeNo");
      this.$router.push({ path: "/AddEmployee" });
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
  width: .62rem;
}
.data-list {
  text-align: center;
  // width: 34%;
}
#page {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  #header {
    width: 100%;
    height: 2.1rem;
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
    .h-top {
      height: 1.1rem;
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
    top: 2.1rem;
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
