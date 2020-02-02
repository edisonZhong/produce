<!--统计图 华南大区-->
<template>
  <div id="page">
    <p class='title'>君润人力</p>
    <div class="sub_title">
      <div class="sub_">
        <p>{{topData.nowDayStr}}</p>
        <p class="sub_tab">
          <span>数据说明</span>
          <img @click='showContent' :src="question" alt="">
        </p>
      </div>
      <div class="sub__" style="margin-top: .18rem">
        <div>
          <p class="one">{{topData.healthCount}}</p>
          <p>健康</p>
        </div>
        <div>
          <p class="two">{{topData.feverCoughCount}}</p>
          <p>发烧咳嗽</p>
        </div>
        <div>
          <p class="three">{{topData.otherSymptomCount}}</p>
          <p>其他症状</p>
        </div>
        <div>
          <p class="four">{{topData.noPunchCount}}</p>
          <p>未打卡</p>
        </div>
      </div>
    </div>
    <div id="main" ref="content">
      <!-- <div class="threeCard">
        <div class="card">
          <img :src="imgUrlOne" alt="">
          <div class="" style="position:absolute;top:.24rem;left:.3rem;" v-if='boxBar.titlesBar'>
            <p style="color:#EB9F4B;font-size:.4rem;" >{{boxBar.titlesBar[0]?boxBar.titlesBar[0][1]:0}}</p>
            <p style="color:#18314D;font-size:.2rem;">员工总数</p>
          </div>
        </div>
        <div class="card">
          <img :src="imgUrlTwo" alt="">
          <div class="" style="position:absolute;top:.24rem;left:.3rem;" v-if='boxLideDay.titleInfo'>
            <p style="color:#2E90E1;font-size:.4rem;">{{boxBar.titlesBar[0]?boxBar.titlesBar[0][2]:0}}</p>
            <p style="color:#18314D;font-size:.2rem;">{{selectedName=='日'?'昨日':selectedName=='周'?'上周':'上月'}}新增</p>
          </div>
        </div>
        <div class="card">
          <img :src="imgUrlThree" alt="">
          <div class="" style="position:absolute;top:.24rem;left:.3rem;" v-if="boxLideLive.valueInfo">
            <p style="color:#DA3131;font-size:.4rem;">{{boxBar.titlesBar[0]?boxBar.titlesBar[0][3]:0}}</p>
            <p style="color:#18314D;font-size:.2rem;">{{selectedName=='日'?'昨日':selectedName=='周'?'上周':'上月'}}离职</p>
          </div>
        </div>
      </div> -->
      <SouthChart
        @totalArea='totalArea'
        :selectedName="selectedName"
        :clickIndex="clickIndex"
        :boxBar="boxBar"
        :boxIncrese='boxIncrese'
        :boxLideDay='boxLideDay'
        :boxLideLive='boxLideLive'
        :allBox='allBox'

        :xData="xData"
        :yData1="yData1"
        :yData2="yData2"


      >
      </SouthChart>
    </div>

    <div class="healthData">
      <div class="healthTitle">
        <p>员工健康数据</p>
        <p class='checkDetail' @click="goDetail">查看详情</p>
      </div>
      <div class="healthContent">
        <div class="hc">
          <p>地区</p>
          <p>发烧咳嗽</p>
          <p>其他症状</p>
          <p>未打卡</p>
        </div>
        <area shape="" coords="" href="" alt="">
        <div class="big-area" style="overflow: hidden" v-for="(item,index) in bigArea">
          <div @click='dotClick(index)' class="hc highLight" style="position: relative;z-index: 20">
            <p>{{item.orgName}}</p>
            <p>{{item.feverCoughCount}}</p>
            <p>{{item.otherSymptomCount}}</p>
            <p>{{item.noPunchCount}}<b style="transition:all .1s ;" :style="{'transform':(ifContent.indexOf(index)==-1?'rotate(90deg)':'rotate(0deg)')}"></b>
            </p>
          </div>
          <transition leave-active-class='slidedown' enter-active-class='slideup '>
            <div class="area" v-if="ifContent.indexOf(index)!=-1">
              <div class="hcContent" v-for="(items,indexs) in item.childList">
                <p>{{items.orgName}}</p>
                <p>{{items.feverCoughCount}}</p>
                <p>{{items.otherSymptomCount}}</p>
                <p>{{items.noPunchCount}}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- </div> -->
    <!-- <p>到底啦~~~~</p> -->
    <!-- <TabBar></TabBar> -->

    <!-- <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet> -->
    <div class="shadow" v-if="shadowContent">
      <div class="frame">
        <img @click='closeFrame' :src="delImg" alt="">
        <p class="tit">数据说明</p>
        <div class="" v-html="explain">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SouthChart from '../page/chart/SouthChart'
  import EastChart from '../page/chart/EastChart.vue'
  import CenterChart from '../page/chart/CenterChart'
  import NorthChart from '../page/chart/NorthChart'
  import TabBar from './TabBar.vue'
  import {getStatisticsExplain, getHealthStatistics} from "../../server/all";
  // 检测手机型号
  var MobileDetect = require('mobile-detect');

  export default {
    name: 'index',
    components: {
      SouthChart,
      TabBar,
      EastChart,
      CenterChart,
      NorthChart
    },

    data() {
      return {
        test: '',
        clickIndex: 0,
        btnList: ['日', '周', '月'],
        imgUrl: require("@/assets/img/Oval.png"),
        title: '华南大区',
        title_box: [],
        tangle: require("@/assets/img/tangle.png"),


        //州********************************************************************
        topData: {},
        xData: [],
        yData1: [],
        yData2: [],
        bigArea:[],
        //州*****************************************************************





        // 柱状图
        titleBar: [],
        valueListBar:
          [],
        dataNameBar:
          [],
        titlesBar:
          [],
        nameListBar:
          [],
        totalListBar:
          [],
        boxBar:
          [],
        explain:
          '',//数据说明

        //占比图
        boxIncrese:
          [],

        // 入职
        boxLideDay:
          [],

        // 离职
        boxLideLive:
          [],


        //业务大区
        districtBox:
          [],
        arrowImg:
          require("@/assets/img/down.png"),
        sheetVisible:
          false,
        selectedOrganizationName:
          '',
        dataType:
          'D',
        organizationNo:
          '',
        organizationType:
          1,

        // 员工总数
        allBox:
          [],
        selectedName:
          '日',
        detailDate:
          '',
        actions:
          [{name: '日', value: 'D', method: this.getDetailDate}, {
            name: '周',
            value: 'W',
            method: this.getDetailDate
          }, {name: '月', value: 'M', method: this.getDetailDate}],
        sheetVisible:
          false,

        // imgUrlOne:require("@/assets/img/orange.png"),
        question:
          require("@/assets/img/question.png"),
        delImg:
          require("@/assets/img/del.png"),
        // imgUrlThree:require("@/assets/img/red.png"),

        ifContent: [],
        shadowContent:
          false,
      }
    },

    mounted() {

      // // 获取区列表
      // this.getDistrictList();
      //
      // //记录查看记录
      // if(!sessionStorage.getItem("ifRecord")){
      //   sessionStorage.setItem("ifRecord",'recorded');
      //   this.setRecord();
      // }
    },
    created() {
      this.getStatis()
      this.getHealth()
    },
    methods: {
      //获取数据说明
      getStatis() {
        getStatisticsExplain().then(e => {
          if (e.data.code == 200) {
            this.explain = e.data.data
          }
        })
      },
      getHealth() {
        getHealthStatistics().then(e => {
          if (e.data.code == 200) {
            this.topData = e.data.data.recordStatistics
            this.xData=e.data.data.dateList
            this.yData1=e.data.data.feverNumList
            this.yData2=e.data.data.otherNumList
            for(let item in e.data.data.empStatistics){
              console.log(item);
              this.bigArea=[...this.bigArea,e.data.data.empStatistics[item]]
            }
            this.bigArea.forEach((item,index)=>{
              this.ifContent.push(index)
            })
            // e.data.data.empStatistics.forEach((item,index)=>{
            //   console.log(item, index);
            //   // this.bigArea=[...this.bigArea,e.data.data.empStatistics[item]]
            // })
            console.log(this.bigArea);
          }
        })
      },
      closeFrame() {
        this.shadowContent = false;
      },
      showContent() {
        this.shadowContent = true;
      },
      dotClick(index) {
        console.log(index);
        if(this.ifContent.indexOf(index)==-1){
          this.ifContent.push(index)
        }else{
          this.ifContent.splice(this.ifContent.indexOf(index), 1);
        }
        console.log(this.ifContent);
        // if (this.ifContent) {
        //   this.ifContent = false;
        // } else {
        //   this.ifContent = true;
        // }
      },
      getGrowth(data) {
        // console.log(data,'data123');
        var valueTypeList = [];
        for (var key in data) {
          valueTypeList.push(data[key][0])
        }
        // console.log(valueTypeList,'data123321');

        var positionType = [];
        var percentList = [];
        for (let i = 0; i < valueTypeList.length; i++) {
          var a = i;
          positionType[a] = [];
          // valueTypeList[i].xDataList.map(item=>{
          //   positionType[a].push(item.xData)
          // })
          var b = i;
          percentList[b] = [];


          var z;
          for (z = valueTypeList[i].xDataList.length - 1; z >= 0; z--) {
            // text += cars[i] + "<br>";
            positionType[a].push(valueTypeList[i].xDataList[z].xData)
            percentList[b].push(valueTypeList[i].xDataList[z].total)
          }


          // valueTypeList[i].xDataList.map(item=> percentList[b].push(item.total))
        }
        // console.log(percentList,positionType,'upppppppp0-90');


        this.allBox = {
          name: positionType,
          value: percentList
        }
        // console.log(this.allBox,'upppppppp0-');

        //   }
        // })
      },
      getLineLive(data) {
        this.liveList = data
        var valueLiveList = [];
        var valueTmp = [];
        for (var key in this.liveList) {
          valueTmp.push(key)
          valueLiveList.push(this.liveList[key])
        }
        // console.log(valueLiveList.length,'离职离职离职离职离职离职离职离职');
        var positionLive = [];
        var percentListLive = [];
        var valueInfo = [];
        for (let i = 0; i < valueLiveList.length; i++) {
          valueInfo.push(valueTmp[i].split('-'))


          var a = i;
          positionLive[a] = [];
          valueLiveList[i].map(item => positionLive[a].push(item.organizationName))

          var b = i;
          percentListLive[b] = [];
          valueLiveList[i].map(item => percentListLive[b].push(item.total))
        }

        // this.$nextTick(()=> {
        //     this.dataChartLive()
        // })
        this.boxLideLive = {
          positionLive: positionLive,
          percentListLive: percentListLive,
          valueInfo: valueInfo
        }

        // console.log(this.boxLideLive,'lizhilizhilizhilizhilizhilizhilizhi');
        //   }
        // })
      },
      getLineDay(data) {
        // reportEnter({
        //   dateType:this.dataType
        // }).then(e=>{
        //   console.log(e.data.data,'入职');
        //   if(e.data.code==200){
        this.dayList = data;
        var valueDayList = [];
        var titleTmp = [];
        for (var key in this.dayList) {
          titleTmp.push(key);
          valueDayList.push(this.dayList[key])
        }
        // console.log(this.dayList,'listttttt-----+');
        var positionDay = [];
        var percentListDay = [];
        var titleInfo = [];
        for (let i = 0; i < valueDayList.length; i++) {

          titleInfo.push(titleTmp[i].split('-'))


          var a = i;
          positionDay[a] = [];
          valueDayList[i].map(item => {
            positionDay[a].push(item.organizationName);
            // console.log(item,'dddddddddddd');
          })

          var b = i;
          percentListDay[b] = [];
          valueDayList[i].map(item => percentListDay[b].push(item.total))
        }

        // this.$nextTick(()=> {
        //     this.dataChart()
        // })
        this.boxLideDay = {
          positionDay: positionDay,
          percentListDay: percentListDay,
          titleInfo: titleInfo
        }

        console.log(this.boxLideDay.titleInfo, '入职入职入职入职入职入职入职入职入职入职');

        // }
        // })
      },
      getLine(data) {
        // reportLine().then(e=>{
        //   console.log(e,'zhanbi');
        //   if(e.data.code==200){
        this.dataNameType = data
        console.log(data, '0-0-0-0-0-0-0-0-0-0-0123123123');
        var valueTypeList = [];
        for (var key in this.dataNameType) {
          valueTypeList.push(this.dataNameType[key])
        }

        var positionType = [];
        var percentList = [];
        var total = [];
        var pieData = [];

        for (let i = 0; i < valueTypeList.length; i++) {
          var a = i;
          positionType[a] = [];
          valueTypeList[i].map(item => positionType[a].push(item.positionType))

          var b = i;
          percentList[b] = [];
          valueTypeList[i].map(item => percentList[b].push(item.totalPercentage))

          var c = i;
          total[c] = [];
          valueTypeList[i].map(item => total[c].push(item.total))

          var d = i;
          pieData[d] = [];
          valueTypeList[i].map(item => pieData[d].push({value: item.total, name: item.positionType}))
        }

        // console.log(positionType,percentList,'listtttt');


        this.boxIncrese = {
          positionType: positionType,
          percentList: percentList,
          total: total,
          pieData: pieData
        }
        //   }
        // })
      },
      getData(data) {
        // reportData({
        //   dateType:this.dataType
        // }).then(e=>{
        //   console.log(e,'员工总数');
        // if(e.data.code==200){
        // console.log(data,'dataaaa');
        this.dataNameBar = data;
        var valueListBar = [];
        this.titleBar = [];
        this.titlesBar = [];
        for (var key in this.dataNameBar) {
          this.titleBar.push(key)
          valueListBar.push(this.dataNameBar[key])
        }
        // console.log(valueListBar,this.titleBar,'valueListBarrrrrrr');
        // 遍历出title值
        // this.totalArea(this.titleBar);

        // x,y轴数据
        var nameListBar = [];
        let totalListBar = [];
        for (let i = 0; i < this.titleBar.length; i++) {
          // 图表标题
          this.titlesBar.push(this.titleBar[i].split('-'))

          // 图表y轴
          var a = i;
          nameListBar[a] = [];
          // console.log(valueListBar[i],'iiiiiiiiiiii]]]]]]]]');
          valueListBar[i].map(item => nameListBar[a].push(item.organizationName))


          // 图表x轴
          var b = i;
          totalListBar[b] = [];
          valueListBar[i].map(item => totalListBar[b].push(item.total))
        }


        this.boxBar = {
          nameList: nameListBar,
          totalList: totalListBar,
          titlesBar: this.titlesBar
        }
        console.log(this.boxBar.titlesBar, 'testing');

        // }
        // })
      },
      totalArea(e) {
        let arr = [];
        for (let i = 0; i < e.length; i++) {
          arr.push(e[i].split('-')[0]);
        }
        this.title_box = arr;
        // console.log(this.title_box.length,this.title_box,'length');


      },
      // addClass(index){
      //     if(index==0){
      //       this.dataType = 'D'
      //     }else if(index==1){
      //       this.dataType = 'W'
      //     }else if (index==2) {
      //       this.dataType = 'M'
      //     }
      //     this.clickIndex=index;
      //     this.getChartsData()
      //
      // },
      addClass(index, no, name) {
        // if(index==0){
        // this.dataType = 'D'
        // }else if(index==1){
        //   this.dataType = 'W'
        // }else if (index==2) {
        //   this.dataType = 'M'
        // }
        console.log(index, 'index');
        this.organizationName = name;
        this.selectedOrganizationName = name;
        this.organizationNo = no;
        this.clickIndex = index;
        this.getChartsData()

      },
      goDetail() {
        this.$router.push({
          path: '/nohealthList'
        })
      }
      // handleScroll(el){
      //     this.scrollTop = this.$refs.content.scrollTop
      //     // console.log(this.$refs.content.scrollTop)
      // }
    }
  }
</script>

<style lang="less" scoped>
  #page {
    padding-top: .3rem;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    background: #fff;
    /* padding-left:.3rem;
    padding-right:.3rem; */
    .title {
      width: 1.3rem;
      border-bottom: 5px solid #EB9F4B;
      margin-left: auto;
      margin-right: auto;
      /* margin-top:.3rem; */
      margin-bottom: .3rem;
      font-size: .3rem;
    }
    .sub_title {
      .sub_ {
        display: flex;
        justify-content: space-between;
        .sub_tab {

          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: .4rem;
            /* height:.4rem; */
          }
        }

      }
      .sub__ {
        display: flex;
        justify-content: space-between;
        text-align: center;
        div {
          p:first-child {
            /* font-size:.25rem; */
            font-weight: bold;
          }
          p:nth-child(2) {

          }
        }
        .one {
          color: green;
        }
        .two {
          color: red;
        }
        .three {
          color: #EB9F4B;
        }
        .four {
          color: gray;
        }
      }
    }
    .healthData {
      .healthTitle {
        display: flex;
        justify-content: space-between;
      }
      .healthContent {
        .hc {
          display: flex;
          justify-content: space-between;
          text-align: center;
          height: 1rem;
          line-height: 1rem;
          p {
            flex: 1;
          }
          p:first-child {
            text-align: left !important;
          }
        }
        .highLight {
          background: #f2f2f2;
          padding-left: .3rem;
          padding-right: .3rem;
          position: relative;
          b {
            /* width:1rem;
            height:1rem; */
            border: .1rem solid transparent;
            border-top: .1rem solid #000;
            position: absolute;
            top: .42rem;
            right: 0.35rem;
          }
        }
        .hc:first-child {
          padding-left: .3rem;
          padding-right: .3rem;
        }
        .hcContent {
          display: flex;
          justify-content: space-between;
          text-align: center;
          /*height: 1rem;*/
          /*line-height: 1rem;*/
          padding: .28rem .3rem;
          /*padding-left: .3rem;*/
          /*padding-right: .3rem;*/
          p {
            flex: 1;
          }
          p:first-child {
            text-align: left !important;
          }
        }
      }
    }
  }

  .shadow {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 200;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    .tit {
      font-size: .36rem;
      color: #FF9300;
      margin-bottom: .2rem;
    }
    .frame {
      position: fixed;
      left: 0;
      right: 0;
      top: 3rem;
      /* bottom:0; */
      index: 100;
      width: 6rem;
      height: auto;
      background: #fff;
      margin: auto;
      box-sizing: border-box;
      padding: .3rem;
      img {
        position: absolute;
        right: 0;
        top: -1rem;
      }
    }
  }

  .districtList {
    max-height: 3.8rem;
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    top: 2.1rem;
  }

  .districtList > div {
    height: .92rem;
    line-height: .92rem;
    text-align: center;
    font-size: 32 rpx;
    color: #18314D;
    border-bottom: 1px solid #DCDFE6;
    background: #fff;
  }

  /deep/ .mint-button--default {
    box-shadow: unset !important;
  }

  .header-bottom {
    padding-left: .3rem;
    padding-right: .3rem;
    box-sizing: border-box;
  }

  .newtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: .3rem;
    padding-right: .3rem;
    box-sizing: border-box;
    position: unset !important;
    margin-top: .25rem;
    img {
      width: .23rem;
      position: absolute;
      left: 3rem;
    }
    .detail {
      font-size: .24rem;
    }
  }

  .threeCard {
    display: flex;
    justify-content: space-between;
    margin-bottom: .3rem;
    padding-top: .1rem;
    .card {
      box-shadow: 0px 0px 10px #eee;
      position: relative;
      img {
        width: 2.1rem;
        height: 1.4rem;
      }
    }

  }

  .sub_title, #main, .healthTitle {
    padding-left: .3rem;
    padding-right: .3rem;
  }

  .checkDetail {
    color: #EB9F4B;
  }

</style>
