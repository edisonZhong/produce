<!--统计图 华南大区-->
<template>
    <div id="page">
        <!-- <div v-for="(item ,index_) in title_box" :key='index_'> -->
          <div id='header'>
              <div class="header-bottom">
                  <mt-button class="bottom-click"
                  v-for="(item,index) in btnList"
                  v-on:click="addClass(index)"
                  :key='index'
                  v-bind:class="{ classred:index==clickIndex}"
                  size="normal">{{item}}</mt-button>
              </div>

              <h2 class="title" style="display:flex;justify-content:center;align-items:center;" @click="selectDistrict">
                <span>{{selectedOrganizationName||''}}</span>
                <img style="width:20px;height:20px;" :src='arrowImg' alt="" />
              </h2>
          </div>
          <div class="img">
              <img :src='imgUrl' alt=""/>
          </div>
          <div id="main" @scroll="handleScroll" ref="content"  >
              <SouthChart  @totalArea='totalArea'   :boxBar="boxBar" :boxIncrese='boxIncrese' :boxLideDay='boxLideDay' :boxLideLive='boxLideLive'></SouthChart>
              <!-- {{item,'dddddd'}} -->
              <!-- <EastChart id='3'></EastChart>
              <CenterChart id='4'></CenterChart>
              <NorthChart id='5'></NorthChart> -->
          </div>
        <!-- </div> -->
        <p>到底啦~~~~</p>
        <TabBar></TabBar>

        <div class="" v-if="sheetVisible">
          <div class="shadow" @click="sheetVisible=false;"></div>
          <div class="districtList">
            <div class="" v-for="(item,index) in districtBox" :key='index' @click="selectName(item.organizationName,item.organizationNo)">
              {{item.organizationName}}
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

import {getToken,reportData,reportLine,reportEnter,getDistrictList,getChartsData} from '../../server/report'


export default {
    name:'index',
    components:{
        SouthChart,
        TabBar,
        EastChart,
        CenterChart,
        NorthChart
    },

    data(){
        return{
            test:'',
            clickIndex:0,
            btnList:['每日','每周','每月'],
            imgUrl:require("@/assets/img/Oval.png"),
            title:'华南大区',
            title_box:[],

            // 柱状图
            titleBar:[],
            valueListBar:[],
            dataNameBar:[],
            titlesBar:[],
            nameListBar:[],
            totalListBar:[],
            boxBar:[],

            //占比图
            boxIncrese:[],

            // 入职
            boxLideDay:[],

            // 离职
            boxLideLive:[],


            //业务大区
            districtBox:[],
            arrowImg:require("@/assets/img/down.png"),
            sheetVisible:false,
            selectedOrganizationName:'',
            dataType:'D',
            organizationNo:'',
            organizationType:1,


        }
    },
    mounted(){

    },
    created(){
      // 员工总数
      // await this.getData()
      // // this.init()
      // // 占比
      // await this.getLine()
      // // 入职
      // await this.getLineDay()
      // // 离职
      // await this.getLineLive()

      // 获取区列表
      this.getDistrictList();
    },
    methods:{
      selectName(name,no){
        this.selectedOrganizationName = name;
        this.organizationNo = no;
        this.sheetVisible = false;
      },
      selectDistrict(){
        this.sheetVisible = true;
      },
      getDistrictList(){
        getDistrictList().then((res)=>{
          console.log(res,'d');
          this.districtBox = res.data.data;
          this.selectedOrganizationName = res.data.data[0].organizationName;
          this.organizationNo = res.data.data[0].organizationNo;

          // 获取默认的图表数据
          this.getChartsData()

        })
      },
      getChartsData(){
        getChartsData({
          dateType:this.dataType,
          organizationNo:this.organizationNo,
          organizationType:this.selectedOrganizationName=='君润人力'?1:2
        }).then((res)=>{
          console.log(res,'ress');
          // 员工总数
          // console.log();
          // this.getData(res.data.data.totalMap)
          // 入职
          // 辞职
          // 岗位属性员工数占比统计图

        })
      },
      getLineLive(){
        reportEnter({
          dateType:this.dataType
        }).then(e=>{
          if(e.data.code==200){
            this.liveList=e.data.data
            var valueLiveList = [];
            for (var key in this.liveList) {
                valueLiveList.push(this.liveList[key])
            }
            console.log(valueLiveList.length,'离职离职离职离职离职离职离职离职');
            var positionLive = [];
            var percentListLive = [];
            for(let i=0;i<valueLiveList.length;i++){
              var a =i;
              positionLive[a]=[];
              valueLiveList[i].map(item=> positionLive[a].push(item.organizationName))

              var b =i;
              percentListLive[b]=[];
              valueLiveList[i].map(item=> percentListLive[b].push(item.total))
            }

            // this.$nextTick(()=> {
            //     this.dataChartLive()
            // })
            this.boxLideLive = {
              positionLive:positionLive,
              percentListLive:percentListLive
            }

            console.log(this.boxLideLive,'lizhilizhilizhilizhilizhilizhilizhi');
          }
        })
      },
      getLineDay(){
        reportEnter({
          dateType:this.dataType
        }).then(e=>{
          console.log(e.data.data,'入职');
          if(e.data.code==200){
            this.dayList=e.data.data;
            var valueDayList = [];
            for (var key in this.dayList) {
                valueDayList.push(this.dayList[key])
            }
            // console.log(this.dayList,'listttttt-----+');
            var positionDay = [];
            var percentListDay = [];
            for(let i=0;i<valueDayList.length;i++){
              var a = i;
              positionDay[a] = [];
              valueDayList[i].map(item=> {
                positionDay[a].push(item.organizationName);
                // console.log(item,'dddddddddddd');
              })

              var b = i;
              percentListDay[b] = [];
              valueDayList[i].map(item=> percentListDay[b].push(item.total))
            }

            // this.$nextTick(()=> {
            //     this.dataChart()
            // })
            this.boxLideDay = {
              positionDay:positionDay,
              percentListDay:percentListDay
            }

            // console.log(this.boxLideDay,'入职入职入职入职入职入职入职入职入职入职');

          }
        })
      },
      getLine(){
        reportLine().then(e=>{
          console.log(e,'zhanbi');
          if(e.data.code==200){
            this.dataNameType=e.data.data
            var valueTypeList = [];
            for (var key in this.dataNameType) {
              valueTypeList.push(this.dataNameType[key])
            }

            var positionType = [];
            var percentList = [];
            for(let i=0;i<valueTypeList.length;i++){
              var a = i;
              positionType[a] = [];
              valueTypeList[i].map(item=> positionType[a].push(item.positionType))

              var b = i;
              percentList[b] = [];
              valueTypeList[i].map(item=> percentList[b].push(item.totalPercentage))
            }

            console.log(positionType,percentList,'listtttt');


            this.boxIncrese = {
              positionType:positionType,
              percentList:percentList
            }
          }
        })
      },
      getData(data){
          // reportData({
          //   dateType:this.dataType
          // }).then(e=>{
          //   console.log(e,'员工总数');
            // if(e.data.code==200){

              this.dataNameBar=data;
              let valueListBar = [];
              for (var key in this.dataNameBar) {
                  this.titleBar.push(key)
                  valueListBar.push(this.dataNameBar[key])
              }

              // 遍历出title值
              // this.totalArea(this.titleBar);

              // x,y轴数据
              var nameListBar = [];
              let totalListBar = [];
              for(let i=0;i<this.titleBar.length;i++){
                // 图表标题
                this.titlesBar.push(this.titleBar[i].split('-'))

                // 图表y轴
                var a = i;
                nameListBar[a]=[];
                valueListBar[i].map(item => {
                  nameListBar[a].push(item.organizationName)
                })


                // 图表x轴
                var b = i;
                totalListBar[b]=[];
                valueListBar[i].map(item=> totalListBar[b].push(item.total))
              }

              console.log(nameListBar,totalListBar,'testing');

              this.boxBar = {
                nameList:nameListBar,
                totalList:totalListBar,
                titlesBar:this.titlesBar
              }
            // }
          // })
        },
        totalArea(e){
          let arr =[];
          for(let i=0;i<e.length;i++){
            arr.push(e[i].split('-')[0]);
          }
          this.title_box = arr;
          console.log(this.title_box.length,this.title_box,'length');


        },
        addClass(index){
            this.clickIndex=index;
        },
        handleScroll(el){
            this.scrollTop = this.$refs.content.scrollTop

            // console.log(this.$refs.content.scrollTop)
        }
    }
}
</script>

<style lang="less" scoped>
#page{
    height: 100%;
    position: relative;
    box-sizing: border-box;
    #header{
        height: 2.14rem;
        width: 100%;
        background:rgba(67,120,190,1);
        position: absolute;
        top:0;
        bottom:.98rem;
        left: 0;
        right:0;
        display: flex;
        flex-direction: column;
        .title{
            position: absolute;
            width: 100%;
            line-height: 0.64rem;
            text-align: center;
            top: 1.5rem;
            height: 0.64rem;
            color: #fff;
            font-size: .32rem;
        }
        .header-bottom{
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 1.5rem;
            width: 100%;
        }
        .bottom-click{
            width: 2.1rem;
            height: .72rem;
            background:rgba(255,255,255,0.2);
            border:1px solid rgba(255,255,255,0.2);
            border-radius: .2rem;
            color:rgba(255,255,255,1);
            font-size: 14px
        }
        .classred{
            width: 2.1rem;
            height: .72rem;
            background: rgba(255,255,255,1);
            border:1px solid rgba(255,255,255,0.2);
            border-radius: .2rem;
            color:rgba(67,120,190,1);
            font-size: 14px
        }
    }
    .img{
        width: 100%;
        height: 1.5rem;
        position: absolute;
        top:2.12rem;
        left: 0;
        right:0;
        img{
            width: 100%;
        }
    }
    #main{
        // height: 100%;
        width: 100%;
        position: absolute;
        top:2.14rem;
        padding: 0 .3rem;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        bottom: .98rem;
        // background: #fff
    }
}
.shadow{
  width:100%;
  height:100%;
  position:absolute;
  left:0;
  right:0;
  top:2.3rem;
  bottom:0;
  background-color:rgba(0,0,0,.5);
}
.districtList{
  max-height:3.8rem;
  overflow-y: scroll;
  position: absolute;
    left: 0;
    right: 0;
    top: 2.3rem;
}
.districtList>div{
  height:.92rem;
  line-height:.92rem;
  text-align:center;
  font-size:32rpx;
  color:#18314D;
  border-bottom:1px solid #DCDFE6;
  background:#fff;
}
</style>
