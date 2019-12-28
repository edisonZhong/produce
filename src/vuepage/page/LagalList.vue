<!--选择劳动合同牌照-->
<template>
  <div style="position: relative;height:100%">
    <div class="header">
      <div class="h-top">
          <mt-search @focus.native.capture="handleCommentFocus" v-model="value" :placeholder="placeholder" @keyup.native.enter="search(value)"></mt-search>
           <p class="seach" @click="handleSeach">搜索</p>
      </div>
    </div>
   <mescroll-vue id="main" ref="mescroll" :down='mescrollDown' :up="mescrollUp" @init="mescrollInit">
        <ul style="height: 100%;width: 100%;">
            <li class="label-list" v-for="(item,index) in dataList" :key="index" @click="handleLink(item.companyNo,item.companyName)">{{item.companyName}}</li>
        </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import "mescroll.js/mescroll.min.css";
import { Indicator } from "mint-ui";
import { selectCart } from "../../server/employee";
import { log } from 'util';
export default {
  name: "client",
  components:{MescrollVue },
  data() {
    return {
      imgUrl: require("@/assets/img/seach.png"),
      value: "",
      count: 0,
      mescroll:null,
       mescrollDown:{ 
        callback:this.downCallBack,
        clearEmptyId:"main",
						isBoth: false, 
            isBounce: true,
             
         },
      mescrollUp: { // 上拉加载的配置.
          click: true,
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
          // icon: "./static/mescroll/mescroll-empty.png", 
          tip: "暂无相关数据~" //提示
          },
        htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
      },
      pages: {
        page: 1,
        size: 50,
        total: 0
      },
      dataList: [] // 列表数据
    };
  },
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
    handleCommentFocus(){
      this.placeholder=''
    },
    search(){
      this.handleSeach()
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll  
    },
    downCallBack(mescroll){
          setTimeout(function(){
					mescroll.endSuccess()
				},1500);
  },
    getList(page, mescroll) {
    const that = this
      selectCart({
        page: page.num,
        limit: page.size,
        companyName:this.value
      }).then(e => {
        // console.log(page.num);
        if (e.data.code == 200) {
          var arr = e.data.data
           let data = page.num == 1 ? [] : this.dataList;
           this.dataList = this.dataList.concat(arr)
          //  console.log(this.dataList);
           this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
        }
      });
    },
     handleSeach(){
       let searchList = []
       const that = this
      selectCart({
        page: this.pages.page,
        limit: this.pages.size,
        companyName:this.value
      }).then(e => {
        // console.log(page.num);
        if (e.data.code == 200) {
          this.searchList=e.data.data
          this.dataList=this.searchList
        }
      });
    },
    handleLink(companyNo,companyName){
      this.$router.push({
        path:'/AddEmployee',
      })
      localStorage.setItem("companyNo", JSON.stringify(companyNo))
      localStorage.setItem("companyName", JSON.stringify(companyName))
    }
  }
};
</script>

<style lang="less" scoped>
#main {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  position: absolute;
  top: 1.04rem;
  padding:0.1rem;
  li {
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 15px;
    padding-left: 0.15rem;
    border-bottom: 1px solid #f2f2f2;
  }
}
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
  padding: .1rem;
  background: #fff;
  box-sizing: border-box;
  .h-top {
      height: 1.14rem;
      width: 100%;
      border-bottom: 0.5px solid #f2f2f2;
      img {
        position: absolute;
        top: 0.5rem;
        padding: 0 0.3rem;
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