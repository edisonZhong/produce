<!--员工信息-->
<template>
  <div id="page">
    <!-- 员工信息 -->
    <div id="header">
      <div class="h-top">
        <mt-search v-model="value" placeholder="搜索"></mt-search>
        <p class="seach">搜索</p>
      </div>
      <div class="h-bottom">
        <p class="number-list">序号</p>
        <p class="data-list">姓名</p>
        <p class="data-list">客户工号</p>
        <p class="data-list">入职日期</p>
      </div>
      <img :src="imgCut" alt />
    </div>
    <div id="main" ref="mescroll" class="mescroll">
      <ul style="height: 50px;width: 100%;">
        <li v-for="(item,index) in dataList" :key="index">
          <p class="number-list">{{index?index+1:'' }}</p>
          <p class="data-list">{{item.employeeName}}</p>
          <p class="data-list">{{item.employeeNo}}</p>
          <p class="data-list">{{item.entryAt}}</p>
        </li>
      </ul>
    </div>
    <TabBar></TabBar>
    <img style="position: fixed;right: .1rem;bottom: 1.5rem" :src="imgUrl" @click="handlePush" alt />
  </div>
</template>

<script>
import TabBar from "./TabBar";
import { listData } from "../../server/employee";

import Mescroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
export default {
  name: "employee",
  components: { TabBar, Mescroll },
  data() {
    return {
      dataList: [],
      value: "",
      count: "0",
      loading: true,
      imgUrl: require("@/assets/img/Group.png"),
      page: {
        page: 1,
        size: 50,
        total: 0
      },
      mescroll: null,
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.getData
      },
      imgCut: require("@/assets/img/cutOff.png")
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.mescroll = new Mescroll(this.$refs.mescroll, {
      // down:{
      //   callback:this.downCallback
      // },
      up: {
        user: true,
        callback: this.getList(),
        noMoreSize: 5,
        htmlNodata: '<p class="upwarp-nodata">暂无更多数据---</p>'
      },
      empty: {
        warpId: "mescroll",
        tip: "暂无相关数据哦~~~"
      }
    });
    up: {
      user: true;
    }
  },
  methods: {
    getList() {
        console.log(111);
    const that = this
      listData({
        page: this.page.page,
        limit: this.page.size
      }).then(e => {
        if (e.data.code == 200) {
          this.dataList = e.data.list;
          if (page.page == 1) {
            that.dataList = [];
          }
          var data = e.data.data;
          if (data && data.length > 0) {
            that.dataList = that.dataList.concat(data);
          }
        }
        that.$nextTick(() => {
          that.mescroll.endSuccess(data.length);
        });
      });
    },
    handlePush() {
      this.$router.push({ path: "/AddEmployee" });
    }
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
    position: absolute;
    top: 0;
    bottom: 1rem;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    font-size: 0.24rem;
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
        line-height: 1.04rem;
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
    top: 2.04rem;
    bottom: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    left: 0;
    right: 0;
    ul {
      li {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid rgba(220, 223, 230, 1);
      }
    }
  }
}
</style> 