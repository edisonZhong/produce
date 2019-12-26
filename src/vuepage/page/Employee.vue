<!--员工信息-->
<template>
  <div id="page">
    <!-- 员工信息 -->
    <div id="header">
      <div class="h-top">
        <mt-search v-model="value" placeholder="输入关键字" @keyup.native.enter="search(value)"></mt-search>
        <p class="seach" @click="handleSeach">搜索</p>
      </div>
      <div class="h-bottom">
        <p class="number-list">序号</p>
        <p class="data-list" style="width:22%">姓名</p>
        <p class="data-list">客户工号</p>
        <p class="data-list">入职日期</p>
      </div>
      <!-- <img :src="imgCut" alt /> -->
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
          <p class="data-list" style="width:22%">{{item.employeeName}}</p>
          <p class="data-list">{{item.employeeNo}}</p>
          <p class="data-list">{{item.entryAt}}</p>
        </li>
      </ul>
    </mescroll-vue>
    <TabBar></TabBar>
    <div style="position: fixed;right: 0.3rem;bottom: 2rem;">
      <transition name="mybox">
        <div v-if="imgFlag">
          <span class="enter-img" @click="handlePushEnter">入职</span>
          <span class="live-img" @click="handleLive">离职</span>
        </div>
      </transition>
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
        isBounce: true
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
        htmlLoading:
          '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
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
      }
    };
  },
  created() {},
  mounted() {},

  methods: {
    search() {
      this.handleSeach();
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    downCallBack(mescroll) {
      setTimeout(function() {
        mescroll.endSuccess();
      }, 1500);
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
    handleImg() {
      this.flag = !this.flag;
      this.imgFlag = !this.imgFlag;
    },
    handlePushEnter() {
      localStorage.removeItem("employeeName");
      localStorage.removeItem("customerEmployeeNo");
      this.$router.push({ path: "/AddEmployee" });
    },
    handleLive() {
      this.$router.push({ path: "/leaveEmployee/id" });
    }
  }
};
</script>

<style lang="less" scoped>
// .mybox-enter,.mybox-leave-to{
//     opacity: 0;
// }
// .mybox-enter-to,.mybox-leave{
//     opacity: 1;
// }
// .mybox-enter-active,.mybox-leave-active{
//     transition: all 2s;
// }
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.number-list {
  text-align: center;
  width: 10%;
}
.data-list {
  text-align: center;
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
      height: 1.04rem;
      width: 100%;
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
      font-size: 14px;
      color: #999;
      border-bottom: 1px solid rgba(220, 223, 230, 1);
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
    padding: 0.1rem;
    box-sizing: border-box;
    ul {
      .class2 {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 1rem;
        padding-left: 0.15rem;
        border-bottom: 1px solid rgba(220, 223, 230, 1);
      }
      .class1 {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 1rem;
        padding-left: 0.15rem;
        color: #999;
        border-bottom: 1px solid rgba(220, 223, 230, 1);
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
/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  li::after {
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  li::after {
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .h-bottom::after {
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .h-bottom::after {
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33);
  }
}
</style>
