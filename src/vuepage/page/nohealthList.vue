<template>
  <div class="no-health">
    <div class="tit">
      <p>员工健康数据</p>
      <p>以下为有发热咳嗽及其他症状的员工</p>
    </div>
    <div class="table">
      <div class="title">
        <ul>
          <li>地区</li>
          <li>客户工号</li>
          <li>姓名</li>
          <li>健康状态</li>
        </ul>
      </div>
      <mescroll-vue id="main" class="mescroll-list" ref="mescroll" :up="mescrollUp"
                    @init="mescrollInit">
        <ul class="list">
          <li v-for="item in  dataList">
            <!--{{item}}-->
            <ul>
              <li>{{item.empOrgName}}</li>
              <li>{{item.jobNumberSf}}</li>
              <li>{{item.employeeName}}</li>
              <li>{{item.healthCondition}}</li>
            </ul>
          </li>
        </ul>
      </mescroll-vue>

    </div>
  </div>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {getPatientPaging} from "../../server/all";

  export default {
    name: "nohealthList",
    components: {
      MescrollVue, // 注册mescroll组件
    },
    data() {
      return {
        mescrollUp: { // 上拉加载的配置.
          isBoth: true, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          callback: this.downCallBack,
          htmlNodata: '<p class="upwarp-nodata">到底啦~~~~~</p>',
          noMoreSize: 0,
          page: {
            num: 0,
            size: 10,
            total: 0
          },
          empty: {
            warpId: "main",
            // icon: "./static/mescroll/mescroll-empty.png",
            tip: "暂无相关数据~" //提示
          },
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        },
        dataList: []
      }
    },
    created() {
    },
    methods: {
      mescrollInit(mescroll) {
        this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      downCallBack(page, mescroll) {
        // let arr = ['b','b','b','b','b','b','b','b','b']
        // 如果是第一页需手动置空列表
        // if (page.num === 1) {
        //   this.dataList = []
        // }
        // 把请求到的数据添加到列表
        // console.log(page);
        // setTimeout(()=>{
        //   if(this.dataList.length<20){
        //     this.dataList=this.dataList.concat(arr)
        //     // this.dataList=this.dataList.concat(e.data.data.list)
        //     // 数据渲染成功后,隐藏下拉刷新的状态
        //     this.$nextTick(() => {
        //       mescroll.endSuccess(arr.length,20)
        //       console.log('lll');
        //     })
        //   }else{
        //     mescroll.endErr()
        //     console.log('nnnn');
        //   }
        // },1000)


        getPatientPaging({
          page:page.num,
          limit:page.size,
        }).then(e=>{
          if(e.data.code==200){
            let arr = e.data.data.list
            // 如果是第一页需手动置空列表
            // if (page.num === 1){
            //   this.dataList= []
            // }
            // 把请求到的数据添加到列表
            this.dataList=this.dataList.concat(e.data.data.list)
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          }else{
            mescroll.endErr()
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .no-health {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;

    display: flex;
    flex-direction: column;
    .tit {
      padding: .3rem 0 .19rem 0;
      text-align: center;
      > p:first-child {
        font-size: .36rem;
        color: #FF9300;
      }
      > p:last-child {
        font-size: .24rem;
        color: #909399;
      }
    }
    .table {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      overflow-x: hidden;
      .title {
        > ul {
          display: flex;
          padding: 0 5%;
          background-color: #F8F8F8;
          line-height: 1.02rem !important;
          color: #909399;
          width: 100%;
          border: none;
          li:nth-child(1) {
            flex: 0 1.2rem;
            margin-right: .2rem;
          }
          li:nth-child(2) {
            flex: 0 1.5rem;
            margin-right: .2rem;
          }
          li:nth-child(3) {
            flex: 0 1.2rem;
            margin-right: .2rem;
          }
          li:nth-child(4) {
            flex: 1;
          }
        }
      }
      .mescroll-list {
        .list {
          margin: 0 auto;
          > li {
            width: 90%;
            margin: 0 auto;
            border-bottom: solid .01rem #EBEEF5;
            box-sizing: border-box;
            color: #606266;
            font-size: .28rem;
            padding: .28rem 0;
            > ul {
              display: flex;
              align-items: center;
              li:nth-child(1) {
                flex: 0 1.2rem;
                margin-right: .2rem;
              }
              li:nth-child(2) {
                flex: 0 1.5rem;
                margin-right: .2rem;
              }
              li:nth-child(3) {
                flex: 0 1.2rem;
                margin-right: .2rem;
              }
              li:nth-child(4) {
                flex: 1;
              }
            }
          }
        }
      }

    }
  }

</style>
