<!--选择业务区-->
<template>
  <div style="position: relative;height:100%">
    <div class="header">
      <mt-search v-model="value" placeholder="搜索"></mt-search>
      <p class="seach" @click="handleSeach">搜索</p>
    </div>

    
      <div id="main" ref="mescroll" class="mescroll">
        <div>
            <ul style="height: 50px;width: 100%;">
                <li v-for="(item,index) in dataList" :key="index" @click="handleLink(item.id,item.organizationName)">
                {{item.organizationName}}
              </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import Mescroll  from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import { selectService } from "../../server/employee";
export default {
  name: "selectService",
  components:{Mescroll },
  data() {
    return {
      imgUrl: require("@/assets/img/seach.png"),
      value: "",
      count: 0,
      mescroll:null,
      page: {
        num: 1,
        size: 50,
        total: 0
      },
      dataList: [] // 列表数据
    };
  },
 created() {
  },
  mounted(){
    this.mescroll=new Mescroll(this.$refs.mescroll,{
      // down:{
      //   callback:this.downCallback
      // },
      up:{
        user:true,
        callback:this.getList,
        noMoreSize:5,
        htmlNodata:'<p class="upwarp-nodata">暂无更多数据---</p>'
      },
      empty: {
      warpId: "mescroll", //
      icon: "./static/mescroll/mescroll-empty.png", //
      tip: "暂无相关数据~" //提示
    }
    })
    up:{
      user:true;
    }
  },
  methods: {
   getList(page) {
    const that = this
      selectService({
        page: this.page.num,
        limit: this.page.size,
        organizationName:this.value
      }).then(e => {
        if (e.data.code == 200) {
          if (this.page.num == 1) {
            that.dataList = [];
          }
          var datas = e.data.data;
          var data = datas.list;
          if (data && data.length > 0) {
            that.dataList = that.dataList.concat(data);
          }
        }
        that.$nextTick(() => {
          that.mescroll.endByPage(data.length, e.data.data.total)
        });
      });
    },
    handleSeach(){
      this.page.page = 1;
      this.getList();
    },
    handleLink(id,organizationName){
      console.log(organizationName);
      localStorage.setItem('id',id);
      localStorage.setItem('organizationName',organizationName);

      // sessionStorage.setItem('id',id);
      this.$router.push({
        path:'/AddEmployee',
        query:{
          id:id,
          name:organizationName
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
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 .3rem;
  box-sizing: border-box;

 ul {
      li {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid rgba(220, 223, 230, 1);
      }
    }
}
.seach {
  width: 0.9rem;
  margin-left: 0.3rem;
  color: rgba(187, 192, 198, 1);
  font-size: 0.28rem;
  text-align: center;
  position: absolute;
    top: 0;
    right: .2rem;
    background: #fff;
    line-height: 1.2rem;
}
.mescroll{
  position: fixed;
  top:0;
  bottom: 0;
  height:auto;
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