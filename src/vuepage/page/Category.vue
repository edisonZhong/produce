<!--统计图-->
<template>
  <div>
    <div id="content">
        <h2>员工总数 <span class="number">2222</span> 人，较昨日增长 <span class="number">123</span></h2>
        <div id="chart_example" class="chart"></div>
    </div>
    <div id="content">
        <h2>一二三线员工数及占比</h2>
        <div id="persendChart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {reportData} from '../../server/report'
export default {
  name: "category",
  data() {
    return {

    };
  },
  created(){
    this.$nextTick(()=> {
            this.loadEchart()
            this.percentEchart()
        })
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
      reportData().then(e=>{
        if(e.data.code==200){
          console.log(e);
        }
      })
    },
    //柱状图汇总
    loadEchart() {
        this.myChart = echarts.init(document.getElementById("chart_example"));
        this.myChart.setOption({
      tooltip: {
        trigger: "axis"
      },
      // legend: {
      //   data: ['2011年', '2012年']
      // },
      xAxis: {
        type: "value",
        boundaryGap: [0.2, 0.2],
        max: 1400,
        min: 0,
      },
      yAxis: [
        {
          type: "category",
          data: []
        },
      ],
      series: [
        {
          name: '2011年',
          type: 'bar',
          data: [400, 300, 100, 500, 600, 700],
        },
      ]
      });
    },
    //员工占比
    percentEchart() {
        this.myChartPersend = echarts.init(document.getElementById("persendChart"));
        this.myChartPersend.setOption({
      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        // type: "category",
        // data: []
        {
            type: 'category',
            boundaryGap: true,
            // data: (function (){
            //     var now = new Date();
            //     var res = [];
            //     var len = 10;
            //     while (len--) {
            //         res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            //         now = new Date(now - 2000);
            //     }
            //     return res;
            // })()
            data:['一线','二线','三线']
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
        },
        {
        type: "value",
        boundaryGap: [0.2, 0.2],
        max:100,
        min: 0,
        },
      ],
      series: [
        {
          name: '2011年',
          type: 'bar',
          data: [400, 300, 100, 500, 600, 700],
        },
        {
          name: '2011年',
          type: 'line',
          data: [40, 30, 10, 50, 60, 70],
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
// #chart_example {
//   width: 100%;
//   min-height: 5rem;
//   margin: 0 auto;
// }
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
</style>