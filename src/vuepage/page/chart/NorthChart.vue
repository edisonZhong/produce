<!--统计图-->
<template>
  <div>
     <h2 class="title">{{this.titles[0]}}</h2>
    <div id="content">
        <h2>员工总数 <span class="number">{{this.titles[1]}}</span> 人，昨日增长 <span class="number">{{this.titles[2]}}</span>人</h2>
        <div id="northChart" class="chart"></div>
    </div>
    <div id="content">
        <h2>一二三线员工数及占比</h2>
        <div id="persendChart" class="chart"></div>
    </div>
    <div id="content">
      <h2>昨日入职员工{{}}人</h2>
        <div id="dataChart" class="chart"></div>
    </div>
    <div id="content">
      <h2>昨日入职员工{{}}人</h2>
        <div id="dataChartLive" class="chart"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {reportData,reportLine,reportEnter,reportLive} from '../../../server/report'
export default {
  name: "southChart",
  data() {
    return {
      dataName:[],
      valueList:[],
      nameList:[],
      totalList:[],
      nameLists:[],
      title:[],
      titles:[],
      
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
    this.getData()
    this.init()
    this.getLine()
    this.getLineDay()
    this.getLineLive()
  },
  mounted() {
    // let that = this;
    //   window.onresize = function() {
    //       this.myChart.resize()
    //       this.myChartPersend.resize()
    //   }
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
    getData(){
      reportData({
        dateType:'D'
      }).then(e=>{
        if(e.data.code==200){
          this.dataName=e.data.data
          for (var key in this.dataName) {
              this.title.push(key)
              this.valueList.push(this.dataName[key])
          }
          console.log(this.title[0].split('-'));
          this.titles=this.title[3].split('-')
          this.valueList[3].map(item => this.nameList.push(item.organizationName))
          this.valueList[3].map(item=> this.totalList.push(item.total))
          this.$nextTick(()=> {
              this.loadEchart()
              // this.percentEchart()
          })
        }
      })
    },
    getLine(){
      reportLine().then(e=>{
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
        dateType:'M'
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
        dateType:'M'
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
        this.myChart = echarts.init(document.getElementById("northChart"));
        this.myChart.setOption({
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
          boundaryGap: [0.2, 0.2],
          type: "category",
          data:this.nameList,
          axisTick:{
              show:false
            },
        },
      ],
      series: [
        {
          // name: '',
          type: 'bar',
          barCategoryGap:'70%',
          data: this.totalList,
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
    },
    //员工占比
  percentEchart() {
        this.myChartPersend = echarts.init(document.getElementById("persendChart"));
        
        window.addEventListener("resize", function() {                
          this.myChartPersend.resize();           
        })
        this.myChartPersend.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data:['公司数', '增幅']
        },
        title: {
          // text: '一二三线员工数及占比',
          textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
  //               fontSize:'.32rem',
  //               color:rgba(24,49,77,1),
  //               textAlign: center,
  //               fontWeight: 550,
              },
  //             subtextStyle: {//副标题文本样式{"color": "#aaa"}
  //                 fontFamily: 'Arial, Verdana, sans...',
  //                 fontSize: 12,
  //                 fontStyle: 'normal',
  //                 fontWeight: 'normal',
  //             },
        },
      xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            boundaryGap: [0.2, 0.2],
            data:this.positionType,
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
        boundaryGap: [0.2, 0.2],
        max: 8000,
        min: 0,
        splitNumber:8,
          axisTick:{
              show:false
          },
        },
        {
        type: "value",
        // boundaryGap: [0.2, 0.2],
        max:100,
        min: 0,
        // splitNumber:10,
        splitLine: {
            show: false 
        },
        axisLabel: {
                formatter: '{value} %'
            },
            axisTick:{
            show:false
        },
        },
      ],
      series: [
        {
          name: '公司数',
          type: 'bar',
          data: [400, 300, 100, 500, 600, 700],
        },
        {
          name: '增幅',
          position: 'right',
          type: 'line',
          yAxisIndex: 1,
          data: this.percentList,
        },
      ]
      });
    },
     dataChart() {
        this.myChart = echarts.init(document.getElementById("dataChart"));
        this.myChart.setOption({
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
          data:this.positionDay,
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
          data: this.percentListDay,
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
    },
    dataChartLive() {
        this.myChart = echarts.init(document.getElementById("dataChartLive"));
        this.myChart.setOption({
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
          data:this.positionLive,
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
          data: this.percentListLive,
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
  min-height: 5rem;
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
.title {
  color: rgba(51, 51, 51, 1);
  font-size: 0.32rem;
  line-height: 0.64rem;
  text-align: center;
  width: 100%;
  margin-bottom: 0.2rem;
  font-weight: 600;
}
</style>