<!--统计图 华南大区-->
<template>
    <div id="page">
        <!-- <div v-for="(item ,index_) in title_box" :key='index_'> -->
          <div id='header'>


              <h2 class="title newtitle"  >
                <span >业务外包进展日报</span>
                <!-- <img :src="tangle" alt=""> -->

                <span class="detail">{{detailDate||''}}</span>

              </h2>
              <div class="" style="margin-top:.25rem;">
                <div class="header-bottom" >
                    <div class="bottom-click"
                    v-for="(item,index) in districtBox"
                    v-on:click="addClass(index,item.organizationNo,item.organizationName)"
                    :key='index'
                    v-bind:class="{ classred:index==clickIndex}"
                    size="normal">{{item.organizationName}}</div>
                </div>
              </div>


          </div>
          <!-- <div class="img"> -->
              <!-- <img :src='imgUrl' alt=""/> -->
          <!-- </div> -->
          <div id="main"   ref="content" v-if="if_data" >
              <div class="threeCard" >
                <div class="card">
                  <img :src="imgUrlOne" alt="">
                  <div class="" style="position:absolute;top:.24rem;left:.3rem;" v-if='boxBar.titlesBar'>
                    <p style="color:#EB9F4B;font-size:.4rem;">{{boxBar.titlesBar[0]?boxBar.titlesBar[0][1]:0}}</p>
                    <p style="color:#18314D;font-size:.2rem;">员工总数</p>
                  </div>
                </div>
                <div class="card">
                  <img :src="imgUrlTwo" alt="">
                  <div class="" style="position:absolute;top:.24rem;left:.3rem;" v-if="boxLideDay.titleInfo">
                    <p style="color:#2E90E1;font-size:.4rem;">{{boxBar.titlesBar[0]?boxBar.titlesBar[0][2]:0}}</p>
                    <p style="color:#18314D;font-size:.2rem;">昨日新增</p>
                  </div>
                </div>
                <div class="card">
                  <img :src="imgUrlThree" alt="">
                  <div class="" style="position:absolute;top:.24rem;left:.3rem;" v-if="boxLideLive.valueInfo">
                    <p style="color:#DA3131;font-size:.4rem;">{{boxBar.titlesBar[0]?boxBar.titlesBar[0][3]:0}}</p>
                    <p style="color:#18314D;font-size:.2rem;">昨日离职</p>
                  </div>
                </div>
              </div>
              <NorthChart  @totalArea='totalArea'   :boxBar="boxBar" :boxIncrese='boxIncrese' :boxLideDay='boxLideDay' :boxLideLive='boxLideLive' :allBox='allBox'></NorthChart>
              <!-- {{item,'dddddd'}} -->
              <!-- <EastChart id='3'></EastChart>
              <CenterChart id='4'></CenterChart>
              <NorthChart id='5'></NorthChart> -->
          </div>
        <!-- </div> -->
        <!-- <p>到底啦~~~~</p> -->
        <!-- <TabBar></TabBar> -->

        <!-- <div class="" v-if="sheetVisible">
          <div class="shadow" @click="sheetVisible=false;"></div>
          <div class="districtList">
            <div class="" v-for="(item,index) in districtBox" :key='index' @click="selectName(item.organizationName,item.organizationNo)">
              {{item.organizationName}}
            </div>
          </div>
        </div> -->

        <mt-actionsheet
          :actions="actions"
          @click='getItem'
          v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script>
import SouthChart from '../page/chart/SouthChart'
import EastChart from '../page/chart/EastChart.vue'
import CenterChart from '../page/chart/CenterChart'
import NorthChart from '../page/chart/NorthChart'
import TabBar from './TabBar.vue'

import {getToken,reportData,reportLine,reportEnter,getDistrictList,getChartsData,getDetailDate,getNewChartsData} from '../../server/report'


export default {
    name:'index',
    components:{
        SouthChart,
        TabBar,
        EastChart,
        CenterChart,
        NorthChart,
        sheetVisible:false,
    },

    data(){
        return{
            test:'',
            clickIndex:0,
            btnList:['君润人力','华南大区','华北大区','华东大区','中西大区','中西大d区'],
            imgUrl:require("@/assets/img/Oval.png"),
            tangle:require("@/assets/img/tangle.png"),
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

            // 员工总数
            allBox:[],
            imgUrlOne:require("@/assets/img/orange.png"),
            imgUrlTwo:require("@/assets/img/blue.png"),
            imgUrlThree:require("@/assets/img/red.png"),

            detailDate:'',
            actions:[{name:'日',value:'D',method:this.getDetailDate},{name:'周',value:'W',method:this.getDetailDate},{name:'月',value:'M',method:this.getDetailDate}],
            sheetVisible:false,
            selectedName:'日',

            if_data:true,//是否显示图表
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
      console.log(this,'routers');
      // 获取区列表
       this.getDistrictList();
       //获取日
       this.getDetailDate();

       this.$utils.changeTitle('详情');
    },

    methods:{
      getItem(v){
        console.log(v,'v');
      },
      // selectDate(){
      //   this.sheetVisible=true;
      // },
      getDetailDate(e){
        // console.log(e,'d');
        // return ;
        this.selectedName = e?e.name:'日';
        this.dataType = e?e.value:'D';
        // getDetailDate({dateType:this.dataType}).then((res)=>{
        //   console.log(res,'res9');
        //   this.detailDate = res.data.data;
        // })
      },
      selectName(name,no){
        this.selectedOrganizationName = name;
        this.organizationNo = no;
        this.getChartsData();
        this.sheetVisible = false;
      },
      selectDistrict(){
        // this.sheetVisible = true;
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
        this.$Indicator.open();
        console.log(localStorage.getItem('href'),'123321');
        var a = localStorage.getItem('href');
        let time = a.split('&')[1].split('=')[1];
        let phone = a.split('&')[2].split('=')[1].split('#')[0];
        console.log(this.$utils.date((Number(time)-24*60*60*1000),1),'0-0-0-0-00--0');
        this.detailDate = this.$utils.date((Number(time)-24*60*60*1000),1);
        // return
        getNewChartsData({
          statisticsDate:this.$utils.date((Number(time)-24*60*60*1000),1),
          // statisticsDate:'2019-12-30',
          organizationNo:this.organizationNo,
          employeePhone:phone
        }).then((res)=>{
          console.log(res,'ress');
          // return ;
          if(res.data.data){
            // 员工总数
            let data = JSON.parse(res.data.data.statisticsData);
            // console.log();
            this.getData(data.totalMap)
            // 岗位属性员工数占比统计图
            this.getLine(data.positionMap)
            // 入职
            this.getLineDay(data.entryMap)
            // 辞职
            this.getLineLive(data.resignationMap)
            // 员工数增长情况
            this.getGrowth(data.upMap);
          }else{
            this.if_data = false;
            this.$Toast('暂无数据');
          }


          this.$Indicator.close();
        })
      },
      getGrowth(data){
            console.log(data,'data123');
            var valueTypeList = [];
            for (var key in data) {
              valueTypeList.push(data[key][0])
            }
            console.log(valueTypeList,'data123321');

            var positionType = [];
            var percentList = [];
            for(let i=0;i<valueTypeList.length;i++){
              var a = i;
              positionType[a] = [];
              // valueTypeList[i].xDataList.map(item=>{
              //   positionType[a].push(item.xData)
              // })
              var b = i;
              percentList[b] = [];


              var z;
              for (z = valueTypeList[i].xDataList.length-1; z >= 0; z--) {
                  // text += cars[i] + "<br>";
                    positionType[a].push(valueTypeList[i].xDataList[z].xData)
                    percentList[b].push(valueTypeList[i].xDataList[z].total)
              }


              // valueTypeList[i].xDataList.map(item=> percentList[b].push(item.total))
            }
            console.log(percentList,positionType,'upppppppp0-90');



            this.allBox = {
              name:positionType,
              value:percentList
            }
            console.log(this.allBox,'upppppppp0-');

        //   }
        // })
      },
      getLineLive(data){
        // reportEnter({
        //   dateType:this.dataType
        // }).then(e=>{
        //   if(e.data.code==200){
            this.liveList=data
            var valueLiveList = [];
            var valueTmp = [];
            for (var key in this.liveList) {
                valueTmp.push(key)
                valueLiveList.push(this.liveList[key])
            }
            console.log(valueLiveList.length,'离职离职离职离职离职离职离职离职');
            var positionLive = [];
            var percentListLive = [];
            var valueInfo = [];
            for(let i=0;i<valueLiveList.length;i++){
              valueInfo.push(valueTmp[i].split('-'))



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
              percentListLive:percentListLive,
              valueInfo:valueInfo
            }

            console.log(this.boxLideLive,'lizhilizhilizhilizhilizhilizhilizhi');
        //   }
        // })
      },
      getLineDay(data){
        // reportEnter({
        //   dateType:this.dataType
        // }).then(e=>{
        //   console.log(e.data.data,'入职');
        //   if(e.data.code==200){
            this.dayList=data;
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
            for(let i=0;i<valueDayList.length;i++){

              titleInfo.push(titleTmp[i].split('-'))



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
              percentListDay:percentListDay,
              titleInfo:titleInfo
            }

            console.log(this.boxLideDay,'入职入职入职入职入职入职入职入职入职入职');

          // }
        // })
      },
      getLine(data){
        // reportLine().then(e=>{
        //   console.log(e,'zhanbi');
        //   if(e.data.code==200){
            this.dataNameType=data
            var valueTypeList = [];
            for (var key in this.dataNameType) {
              valueTypeList.push(this.dataNameType[key])
            }

            var positionType = [];
            var percentList = [];
            var total = [];
            var pieData = [];
            for(let i=0;i<valueTypeList.length;i++){
              var a = i;
              positionType[a] = [];
              valueTypeList[i].map(item=> positionType[a].push(item.positionType))

              var b = i;
              percentList[b] = [];
              valueTypeList[i].map(item=> percentList[b].push(item.totalPercentage))

              var c = i;
              total[c] = [];
              valueTypeList[i].map(item=> total[c].push(item.total))

              var d =i;
              pieData[d] = [];
              valueTypeList[i].map(item=> pieData[d].push({value:item.total,name:item.positionType}))
            }

            console.log(positionType,percentList,'listtttt');


            this.boxIncrese = {
              positionType:positionType,
              percentList:percentList,
              total:total,
              pieData:pieData
            }
        //   }
        // })
      },
      getData(data){
          // reportData({
          //   dateType:this.dataType
          // }).then(e=>{
          //   console.log(e,'员工总数');
            // if(e.data.code==200){
              console.log(data,'dataaaa');
              this.dataNameBar=data;
              var valueListBar = [];
              this.titleBar = [];
              this.titlesBar = [];
              for (var key in this.dataNameBar) {
                  this.titleBar.push(key)
                  valueListBar.push(this.dataNameBar[key])
              }
              console.log(valueListBar,this.titleBar,'valueListBarrrrrrr');
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
                console.log(valueListBar[i],'iiiiiiiiiiii]]]]]]]]');
                valueListBar[i].map(item => nameListBar[a].push(item.organizationName))


                // 图表x轴
                var b = i;
                totalListBar[b]=[];
                valueListBar[i].map(item=> totalListBar[b].push(item.total))
              }


              this.boxBar = {
                nameList:nameListBar,
                totalList:totalListBar,
                titlesBar:this.titlesBar
              }
              console.log(this.boxBar,'testing');

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
        addClass(index,no,name){
            // if(index==0){
            this.dataType = 'D'
            // }else if(index==1){
            //   this.dataType = 'W'
            // }else if (index==2) {
            //   this.dataType = 'M'
            // }
            this.organizationName = name;
            this.organizationNo = no;
            this.clickIndex=index;
            this.getChartsData()

        },
        // handleScroll(el){
        //     this.scrollTop = this.$refs.content.scrollTop
        //     // console.log(this.$refs.content.scrollTop)
        // }
    }
}
</script>

<style lang="less" scoped>
#page{
    height: 100%;
    position: relative;
    box-sizing: border-box;
    background: #f2f2f2;
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
          /* height: 1.5rem; */
          display: flex;
          justify-content: space-between;
          width: 100%;
          /* overflow-x: auto; */
          white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
          /* overflow-y:auto; */
          /* width: 7.2rem; */
        }
        .bottom-click{
          /* float:left; */
          display:inline-block;
          width:1.28rem;
          height:.64rem;
          line-height:.64rem;
          /* display:inline-block; */
          font-size:.24rem;
          background:rgba(255,255,255,0.2);
          border:1px solid rgba(255,255,255,0.2);
          border-radius: .2rem;
          text-align:center;
          color:rgba(255,255,255,1);
          /* font-size: 14px */
        }
        .bottom-click:not(:last-child){
          margin-right:.12rem;
        }
        .classred{
            /* width: 2.1rem;
            height: .72rem; */
            background: rgba(255,255,255,1);
            border:1px solid rgba(255,255,255,0.2);
            /* border-radius: .2rem; */
            color:rgba(67,120,190,1);
            /* font-size: 14px */
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
        top:2.34rem;
        padding: 0 .3rem;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        bottom: .98rem;
        background:#f2f2f2;
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
    top: 2.1rem;
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
/deep/ .mint-button--default{
  box-shadow:unset!important;
}
.header-bottom{
  padding-left:.3rem;
  padding-right:.3rem;
  box-sizing: border-box;
}
.newtitle{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding-left:.3rem;
  padding-right:.3rem;
  box-sizing: border-box;
  position:unset!important;
  margin-top:.25rem;
  img{
    width: .23rem;
    position: absolute;
    left: 3rem;
  }
  .detail{
    font-size:.24rem;
  }
}
.threeCard{
  display:flex;
  justify-content:space-between;
  margin-bottom:.3rem;
  padding-top:.1rem;
  .card{
    box-shadow: 0px 0px 10px #eee;
    position:relative;
    img{
      width:2.1rem;
      height:1.4rem;
    }
  }


}
</style>
