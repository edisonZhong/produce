<!--选择业务区-->
<template>
  <div style="position: relative;height:100%">
    <div class="header">
        <mt-search v-model="value" placeholder="搜索" @keyup.native.enter="search(value)"></mt-search>
      <p class="seach" @click="handleSeach">搜索</p>
    </div>
    <mescroll-vue
      id="main"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <ul>
        <li
          v-for="(item,index) in dataList"
          :key="index"
          @click="handleLink(item.id,item.organizationName)"
        >{{item.organizationName}}</li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import "mescroll.js/mescroll.min.css";
import { selectService } from "../../server/employee";
export default {
  name: "selectService",
  components: { MescrollVue },
  data() {
    return {
      imgUrl: require("@/assets/img/seach.png"),
      value: "",
      count: 0,
      mescroll: null,
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
        htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      },
      pages: {
        page: 1,
        size: 50,
        total: 0
      },
      dataList: [] // 列表数据
    };
  },
  created() {},
  methods: {
    search(){
      this.handleSeach()
    },
    downCallBack(mescroll) {
      setTimeout(function() {
        mescroll.endSuccess();
      }, 1500);
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    getList(page, mescroll) {
      const that = this;
      selectService({
        page: page.num,
        limit: page.size,
        organizationName: this.value
      }).then(e => {
        // console.log(page.num);
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
    handleSeach() {
      let searchList = [];
      const that = this;
      selectService({
        page: this.pages.page,
        limit: this.pages.size,
        organizationName: this.value
      }).then(e => {
        // console.log(page.num);
        if (e.data.code == 200) {
          this.searchList = e.data.data.list;
          this.dataList = this.searchList;
        }
      });
    },
    handleLink(id, organizationName) {
      localStorage.setItem(
        "organizationName",
        JSON.stringify(organizationName)
      );
      localStorage.setItem("id", JSON.stringify(id));
      this.$router.push({
        path: "/AddEmployee",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#main {
  width: 100%;
  // position: absolute;
  // top: 1rem;
  // left: 0;
  // right: 0;
  // bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 0.3rem;
  box-sizing: border-box;

  ul {
    li {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 16px;
      height: 1rem;
      border-bottom: 0.5px solid #f2f2f2;
    }
  }
}
.seach {
  width: 0.9rem;
  margin-left: 0.3rem;
  color: #26a2ff !important;
  font-size: 0.32rem;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0.2rem;
  background: #fff;
  line-height: 1.2rem;
}
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0;
  height: auto;
}
.input-seach {
  background: rgba(246, 248, 250, 1);
  height: 0.72rem;
  width: 100%;
  border-radius: 4px;
}
.header {
  height: 1.04rem;
  width: 100%;
  position: fixed;
  z-index: 10;
  padding: 0.1rem;
  box-sizing: border-box;
  img {
    position: absolute;
    top: 0.5rem;
    padding: 0 0.3rem;
  }
}
.mint-indicator-wrapper {
  background: rgba(0, 0, 0, 0);
}

.loading-background,
.mint-loadmore-top span {
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}
.mint-loadmore-top span {
  display: inline-block;
  vertical-align: middle;
}

.mint-loadmore-top span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}

.page-loadmore-desc {
  text-align: center;
  color: #666;
  padding-bottom: 5px;
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
  border-bottom: 1px solid #eee;
}

.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}

.page-loadmore-wrapper {
  overflow: scroll;
}

.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
}

.mint-loadmore-bottom span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>