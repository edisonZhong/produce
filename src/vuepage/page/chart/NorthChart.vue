<!--统计图-->
<template>
  <div>
     <h2 class="title">{{this.titles[0]}}</h2>
    <div id="content">
        <h2>员工总数 <span class="number">{{this.titles[1]}}</span> 人，较昨日增长 <span class="number">{{this.titles[2]}}</span>人</h2>
        <div id="northChart" class="chart"></div>
    </div>
    <!-- <div id="content">
        <h2>一二三线员工数及占比</h2>
        <div id="persendChart" class="chart"></div>
    </div> -->
  </div>
</template>

<script>
import echarts from "echarts";
import {reportData} from '../../../server/report'
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
      titles:[]
    };
  },
  created(){
    this.getData()
  },
  mounted() {
    // let that = this;
    //   window.onresize = function() {
    //       this.myChart.resize()
    //       this.myChartPersend.resize()
    //   }
  },
  methods: {
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
        boundaryGap: [0.2, 0.2],
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
    // percentEchart() {
    //     this.myChartPersend = echarts.init(document.getElementById("persendChart"));
    //     this.myChartPersend.setOption({
    //   tooltip: {
    //     trigger: "axis"
    //   },
    //   xAxis: [
    //     // type: "category",
    //     // data: []
    //     {
    //         type: 'category',
    //         boundaryGap: true,
    //         data:['一线','二线','三线']
    //     },
    //   ],
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    //   yAxis: [
    //     {
    //     type: "value",
    //     boundaryGap: [0.2, 0.2],
    //     max: 8000,
    //     min: 0,
    //     },
    //     {
    //     type: "value",
    //     boundaryGap: [0.2, 0.2],
    //     max:100,
    //     min: 0,
    //     axisLabel: {
    //             formatter: '{value} %'
    //         }
    //     },
    //   ],
    //   series: [
    //     {
    //       name: '',
    //       type: 'bar',
    //       data: [400, 300, 100, 500, 600, 700],
    //     },
    //     {
    //       name: '',
    //       position: 'right',
    //       type: 'line',
    //       data: [40, 30, 10, 50, 60, 70],
    //     },
    //   ]
    //   });
    // },
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