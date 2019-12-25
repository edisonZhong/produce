<!--选择服务客户名称-->
<template>
  <div style="position: relative;height:100%">
    <div class="header">
           <mt-search v-model="value" placeholder="搜索"></mt-search>
           <p class="seach">搜索</p>
    </div>
    <div id="main" ref="mescroll" class="mescroll">
        <div>
            <ul style="height: 50px;width: 100%;">
                <li v-for="(item,index) in dataList" :key="index" @click="handleLink(item.id,item.customerType)">
                {{item.customerType}}
              </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import Mescroll  from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import { Indicator } from "mint-ui";
import { selectType } from "../../server/employee";
export default {
  name: "client",
  components:{Mescroll },
  data() {
    return {
      imgUrl: require("@/assets/img/seach.png"),
      value: "",
      count: 0,
      mescroll:null,
      page: {
        page: 1,
        size: 50,
        total: 0
      },
      dataList: [] // 列表数据
    };
  },
mounted(){
    this.mescroll=new Mescroll(this.$refs.mescroll,{
      // down:{
      //   callback:this.downCallback
      // },
      up:{
        user:false,
        callback:this.getList,
        noMoreSize:5,
        htmlNodata:'<p class="upwarp-nodata">暂无更多数据---</p>'
      },
      empty:{
        warpId:'mescroll',
        tip:'暂无相关数据哦~~~'
      }
    })
    up:{
      user:false;
    }
  },
  methods: {
    getList() {
    const that = this
      selectType({
        page: this.page.page,
        limit: this.page.size,
        customerName:this.value
      }).then(e => {
        if (e.data.code == 200) {
          var datas = e.data.data;
          if (this.page.page == 1) {
            that.dataList = [];
          }
          var data = datas.list;
          if (data && data.length > 0) {
            that.dataList = that.dataList.concat(data);
          }
        }
        that.$nextTick(() => {
          that.mescroll.endSuccess(data.length);
        });
      });
    },
     handleSeach(){
      console.log(1);
      this.page.page = 1;
      this.getList();
    },
    handleLink(id,customerType){
      localStorage.setItem('customerId',id);
      localStorage.setItem('customerType',customerType);
      this.$router.push({
        path:'/AddEmployee',
        query:{
          customerId:id,
          customerType:customerType
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
    border-bottom: 1px solid rgba(220,223,230,1);
  }
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
</style>