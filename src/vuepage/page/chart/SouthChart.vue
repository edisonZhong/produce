<!--统计图 华南大区-->
<template>
  <div>
    <!-- <div class='businessArea'>{{title}}</div> -->

    <div>
      <div id="content">
          <h2>员工总数 <span class="number">{{this.boxBar.titlesBar?this.boxBar.titlesBar[0][1]:''}}</span> 人，昨日增长 <span class="number">{{this.boxBar.titlesBar?this.boxBar.titlesBar[0][2]:''}}</span>人</h2>
          <div  id="chart_example" class="chart"></div>
      </div>
      <div id="content">
          <h2>一二三线员工数及占比</h2>
          <div id="persendChart" class="chart"></div>
      </div>
      <div id="content">
        <h2>昨日入职员工{{this.boxLideDay.titleInfo?this.boxLideDay.titleInfo[0][1]:'0'}}人</h2>
          <div id="dataChart" class="chart"></div>
      </div>
     <div id="content">
          <h2 v-if="this.boxLideLive.valueInfo&&this.boxLideLive.valueInfo[0][1]">昨日离职员工{{this.boxLideLive.valueInfo[0][1]}}人</h2>
          <h2 v-else>昨日离职员工0人</h2>
          <div id="dataChartLive" class="chart"></div>
      </div>
    </div>


  </div>
</template>

<script>
import echarts from "echarts";
import {reportData,reportLine,reportEnter,reportLive} from '../../../server/report'
export default {
  name: "southChart",
  props:[
    'index_',
    'title',
    'boxBar',
    'boxIncrese',
    'boxLideDay',
    'boxLideLive',
  ],

  data() {
    return {
      dataType:'D',

      dataName:[],//总的数据
      valueList:[],//图表数据
      titles:[],//分割的数据
      totalList:[],//总的数据
      nameList:[],//图表数据

      dataNameType:[],
      valueTypeList:[],//图表数据
      positionType:[],//总的数据
      nameListType:[],//图表数据
      percentList:[],

      dayList:[],//每日增长
      dayNameType:[],
      valueDayList:[],
      positionDay:[],//总的数据
      nameListDay:[],//图表数据
      percentListDay:[],

      liveList:[],//每日增长
      liveNameType:[],
      valueLiveList:[],
      positionLive:[],//总的数据
      nameListLive:[],//图表数据
      percentListLive:[]
    };
  },
   created(){
    console.log(this.boxBar,'dddddddd000000----');

    // this.getData()
    // // this.init()
    //
    // this.getLine()
    // // 入职
    // this.getLineDay()


    // setTimeout((res)=>{
    // },2000)

    // 占比
    // await this.$nextTick(()=> {
    //     // this.percentEchart()
    // })
    // 入职
    // await this.$nextTick(()=> {
    //     // this.dataChart()
    // })
    // 离职
    // await this.$nextTick(()=> {
    //     // this.dataChartLive()
    // })
  },

  mounted(){
    // 员工总数
    // this.$nextTick(()=> {
    // })
    // this.init();
  },
  watch:{
    boxBar(val,old){
      console.log(val,old,'ddd');

      if(val){this.loadEchart()}
    },
    boxIncrese(val,old){
      if(val){this.percentEchart()}
    },
    boxLideDay(val,old){

      if(val){this.dataChart()}
    },
    boxLideLive(val,old){

      if(val){this.dataChartLive()}
    }
  },
  methods: {
    init() {
        const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
        setTimeout(() => {
          window.onresize = function() {
              self.chart = echarts.init(document.getElementById("chart_example"));
              self.chart.resize();
          }
        },20)
    },
    getLine(){
      reportLine({
        dataType:this.dataType
      }).then(e=>{
        if(e.data.code==200){
          this.dataNameType=e.data.data
          for (var key in this.dataNameType) {
              this.valueTypeList.push(this.dataNameType[key])
          }
          this.valueTypeList[2].map(item=> this.positionType.push(item.positionType))
          this.valueTypeList[2].map(item=> this.percentList.push(item.totalPercentage))
          this.$nextTick(()=> {
              this.percentEchart()
          })
        }
      })
    },
    getLineDay(){
      reportEnter({
        dateType:this.dataType
      }).then(e=>{
        if(e.data.code==200){
          this.dayList=e.data.data
          for (var key in this.dayList) {
              this.valueDayList.push(this.dayList[key])
          }
          console.log(this.valueDayList);
          this.valueDayList[2].map(item=> this.positionDay.push(item.organizationName))
          this.valueDayList[2].map(item=> this.percentListDay.push(item.total))
          this.$nextTick(()=> {
              this.dataChart()
          })
        }
      })
    },
    getLineLive(){
      reportEnter({
        dateType:this.dataType
      }).then(e=>{
        if(e.data.code==200){
          this.liveList=e.data.data
          for (var key in this.liveList) {
              this.valueLiveList.push(this.liveList[key])
          }
          console.log(this.valueDayList);
          this.valueLiveList[2].map(item=> this.positionLive.push(item.organizationName))
          this.valueLiveList[2].map(item=> this.percentListLive.push(item.total))
          this.$nextTick(()=> {
              this.dataChartLive()
          })
        }
      })
    },
    //柱状图汇总
    loadEchart() {
        let that = this;
        console.log(this.boxBar,'ddd----------------');

        // echarts.init(document.getElementById("chart_example")).resize({height:parseInt(this.boxBar.nameList.length/2)*localStorage.getItem('font')+'px'});
        // this.myChart = echarts.init(document.getElementById("chart_example"));
        echarts.init(document.getElementById("chart_example")).setOption({
          tooltip: {
            trigger: "axis"
          },
          legend: {
            // data: this.nameList
          },
          grid: {
            left: '3%',
            // right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: "value",
            // boundaryGap: [0.2, 0.2],
            max: Math.max(...this.boxBar.totalList[0]),
            min: Math.min(...this.boxBar.totalList[0]),
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            },
          }],
          yAxis: [
            {
              type: "category",
              // boundaryGap:false,//和max,min关联使用
              boundaryGap:[0, 0.01],
              data:this.boxBar.nameList[0],
              // min:function (value) {
              //   // if (value.max < Math.max(...that.boxBar.totalList[that.index_])){
              //   //     value.max = Math.max(...that.boxBar.totalList[that.index_]);
              //   // } else {
              //   //     value.max = value.max;
              //   // }
              //   return Math.min(...that.boxBar.totalList[that.index_]);
              // },
              axisLabel:{
                fontSize:parseInt(0.3*localStorage.getItem('font'))
              }
            },
          ],
        series: [
          {
            name: '',
            type: 'bar',
            data: this.boxBar.totalList[0],
            barWidth:8,
            label: {
                  normal: {
                      show: true,
                      position: 'right'
                  }
              },
               itemStyle:{
                normal:{
                    // color:'#EB9F4B'
                    color: function (params) {
                      var colorList = [
                          '#ff7e50', '#ff7e50', '#ff7e50', '#4378BE',
                          '#4378BE', '#4378BE', '#4378BE', '#4378BE',
                          '#4378BE', '#4378BE', '#4378BE'
                      ];
                      return colorList[params.dataIndex]
                  }
                }
              },

          },
        ]
      });
      window.addEventListener('resize', function () {echarts.init(document.getElementById("chart_example")).resize()})
      // window.onresize = () => {
      //   return (() => {
      //     canvasChart.resize()
      //   })()
      // }
    },
    //员工占比
    percentEchart() {
        // this.myChartPersend = echarts.init(document.getElementById("persendChart"));

        // window.addEventListener("resize", function() {
        //   this.myChartPersend.resize();
        // })
        console.log(this.boxIncrese,'boxIncrese');
        echarts.init(document.getElementById("persendChart")).setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data:['员工数', '占比']
        },
        title: {
          // text: '一二三线员工数及占比',
          textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
  //               fontSize:'.32rem',
  //               color:rgba(24,49,77,1),
  //               textAlign: center,
  //               fontWeight: 550,
            width:'20',
            height:'20'

           },
  //             subtextStyle: {//副标题文本样式{"color": "#aaa"}
  //                 fontFamily: 'Arial, Verdana, sans...',
  //                 fontSize: 12,
  //                 fontStyle: 'normal',
  //                 fontWeight: 'normal',
  //             },
        },
        legend:{
          backgroundColor:'#fff'
        },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          boundaryGap: [0.2, 0.2],
          data:this.boxIncrese.positionType[0],
          axisLine:{
            show:false
          },
          axisTick:{
              show:false
          },
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: [
        {
          type: "value",
          max: Math.max(...this.boxIncrese.percentList[0]),
          min: Math.min(...this.boxIncrese.percentList[0]),
            axisTick:{
                show:false
            },
        },
        {
          type: "value",
          max:Math.max(...this.boxIncrese.percentList[0]),
          min: Math.min(...this.boxIncrese.percentList[0]),
          splitLine: {
              show: false
          },
          axisLabel: {
              formatter: '{value}%'
          },
          axisTick:{
              show:false
          }
        },
      ],
      series: [
        {
          name: '员工数',
          type: 'bar',
          barWidth:18,
          data: this.boxIncrese.percentList[0],
          itemStyle:{
            normal:{
               color: function (params) {
                   var colorList = [
                     '#4378BE','#4378BE', '#4378BE', '#4378BE', '#4378BE',
                     '#4378BE', '#4378BE', '#4378BE','#ff7e50', '#ff7e50',
                     '#ff7e50'
                   ];
                   return colorList[params.dataIndex]
               }
             }
         }
        },
        {
          name: '占比',
          type: 'line',
          symbol:'none', //这句就是去掉点的
          // smooth:true, //折线平滑
          data: this.boxIncrese.percentList[0],
          itemStyle:{
           normal:{
             lineStyle:{
                color:'#ff7e50'
             }
           }
         }
        },
      ]
      })
    },
     dataChart() {
       // console.log(this.boxLideDay.positionDay[this.index_],'dddddd00000099999999888888888');
        // window.addEventListener("resize", function() {
        //          this.myChartPersend.resize();
        // })
        console.log(this.index_,'dddddd12121212121212');
        // this.myChart = echarts.init(document.getElementById("dataChart"));
        // setTimeout((res)=>{
          echarts.init(document.getElementById("dataChart")).setOption({
              tooltip: {
                trigger: "axis"
              },
              legend: {
                // data: this.nameList
              },
              grid: {
                left: '3%',
                // right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: "value",
                // boundaryGap: [0.2, 0.2],
                max: 1400,
                min: 0,
                splitNumber:7,
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
              },
              yAxis: [
                {
                  type: "category",
                  boundaryGap: [0.2, 0.2],
                  data:this.boxLideDay.positionDay[0],
                  scale: true,
                  axisTick:{
                      show:false
                    },
                },
              ],
              series: [
                {
                  name: '',
                  type: 'bar',
                  data: this.boxLideDay.percentListDay[0],
                  label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    },
                     itemStyle:{
                      normal:{
                          color:'#EB9F4B'
                      }
                    }
                },
              ]
          });
        // },1500)

    },
    dataChartLive() {
        // this.myChart = echarts.init(document.getElementById("dataChartLive"));
      // console.log(this.index_,'离职信息信息信息信息信息信息信息信息信息信息')
      // setTimeout((res)=>{
        echarts.init(document.getElementById("dataChartLive")).setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // data: this.nameList
        },
        grid: {
          left: '3%',
          // right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: "value",
          // boundaryGap: [0.2, 0.2],
          max: 1400,
          min: 0,
          splitNumber:7,
          axisLine:{
              show:false
          },
          axisTick:{
              show:false
          },
        },
        yAxis: [
          {
            type: "category",
            boundaryGap: [0.2, 0.2],
            data:this.boxLideLive.positionLive[0],
            scale: true,
            axisTick:{
                show:false
              },
          },
        ],
        series: [
          {
            name: '',
            type: 'bar',
            data: this.boxLideLive.percentListLive[0],
            label: {
                  normal: {
                      show: true,
                      position: 'right'
                  }
              },
               itemStyle:{
                normal:{
                    color:'#EB9F4B'
                }
              }
          },
        ]
        });
      // },1500)

    },
  }
};
</script>

<style lang="less" scoped>
.number{
  color: rgba(235,159,75,1)
}
.chart{
  width: 100%;
  min-height:4rem;
  margin: 0 auto;
}
#content {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 0.4rem 0px rgba(6, 19, 37, 0.1);
  border-radius: 0.2rem;
  margin-bottom: 0.3rem;
  h2{
      padding: 0;
      font-size:.32rem;
      color:rgba(24,49,77,1);
      text-align: center;
      font-weight: 550;
      // padding-top: .4rem;
      height:1.04rem;
      line-height: 1.04rem
  }
}
.businessArea{
  text-align:center;
  font-size:33rpx;
  color:#333;
  font-weight:bold;
  margin-bottom:.3rem;
}
</style>
