<style lang="less" scoped>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }

  /*li::after{*/
  /*  width:0!important;*/
  /*  height: 0!important;*/
  /*}*/
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }

  .number-list {
    text-align: center;
    width: 33%;
  }

  .data-list {
    text-align: center;
    width: 33%;
  }

  #page {
    height: 100%;
    position: relative;
    box-sizing: border-box;

    #header {
      width: 100%;
      height: 2.2rem;
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
      /*padding: .1rem;*/
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
        border-bottom: 1px solid #f2f2f2;

        img {
          position: absolute;
          top: 0.5rem;
          padding: 0 0.3rem;
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
          font-size: 16px;
        }
      }

      .h-bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 2rem;
        // padding-left: 0.15rem;
        box-sizing: border-box;
        font-size: 14px;
        border-bottom: 1px solid #f2f2f2;
      }
    }

    #main {
      position: absolute;
      top: 2.23rem;
      bottom: 1rem;
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
      left: 0;
      right: 0;
      margin-bottom: 1rem;
      padding: 0 0.1rem 0.1rem;
      box-sizing: border-box;
      font-size: 16px;

      ul {
        li {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 1rem;
          border-bottom: 0.5px solid #f2f2f2;
          a {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 1rem;
          }
        }
      }
    }
  }
</style>
<!--员工信息-->
<template>
  <div id="page">
    <!-- 员工信息 -->
    <div id="header">
      <div class="h-top">
        <mt-search v-model="value" placeholder="姓名/客户工号" ref="search" @keyup.native.enter="search(value)"/>
        <p class="seach" @click="search">搜索</p>
      </div>
      <div class="h-bottom" style="color:#999999;">
        <p class="number-list">姓名</p>
        <p class="data-list">客户工号</p>
        <p class="data-list">所属业务区</p>
      </div>
      <!-- <img :src="imgCut" alt/> -->
    </div>
    <mescroll-vue id="main" ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <ul style="height:100%;width: 100%;">
        <li style="color: rgba(38,39,40,1);" v-for="(item,index) in dataList" :key="index">
          <router-link :to="{path:`/leaveEmployee/${item.id}`}">
            <p class="data-list">{{item.employeeName}}</p>
            <p class="data-list">{{item.customerEmployeeNo}}</p>
            <p class="data-list">{{item.organizationName}}</p>
          </router-link>
        </li>
      </ul>
    </mescroll-vue>
    <!--    <TabBar></TabBar>-->
    <!-- <div class="fix">
      <img :src="imgUrl" @click="handlePush" alt />
    </div> -->
  </div>
</template>

<script>
  import TabBar from "./TabBar";
  import {getAllEmployee} from "../../server/employee";

  import Mescroll from "mescroll.js";
  import "mescroll.js/mescroll.min.css";
  import MescrollVue from "mescroll.js/mescroll";

  export default {
    name: "employee",
    components: {TabBar, MescrollVue},
    data() {
      return {
        dataList: [],
        value: "",
        count: "0",
        loading: true,
        imgUrl: require("@/assets/img/Group.png"),
        page: {
          num: 1,
          size: 20,
        },
        mescroll: null, // mescroll实例对象
        mescrollUp: { // 上拉加载的配置.
          callback: this.getList,
          htmlNodata: '<p class="upwarp-nodata">暂无数据</p>',
          noMoreSize: 5,
          page: {
            num: 0,
            size: 20,
            total: 0
          },
          empty: {
            warpId: "main",
            icon: "./static/mescroll/mescroll-empty.png",
            tip: "暂无相关数据~" //提示
          },
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        },
        imgCut: require("@/assets/img/cutOff.png")
      };
    },
    created() {
      // this.getList();
    },
    methods: {
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },
      getList(page, isSearch) {
        const that = this;
        getAllEmployee({
          status: 1,
          page: page.num,
          limit: page.size,
          searchStr: this.value
        }).then(e => {
          let {message, code, data: {list}} = e.data;
          if (code === 200) {
            if (isSearch) {
              that.dataList = list;
            } else {
              that.dataList = [...that.dataList, ...list];
            }
          }
          this.$nextTick(() => {
            this.mescroll.endSuccess(list.length)
          })
        });
      },
      search: function () {
        this.getList(this.page, 'search');
      },
      handlePush() {
        this.$router.push({path: "/AddEmployee"});
      }
    }
  };
</script>
