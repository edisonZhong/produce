<template>
  <div id="content">
      <h2>业务外包签约地区数及增幅</h2>
    <div id="chart_example"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "category",
  data() {
    return {};
  },
  mounted() {
    let myChart = echarts.init(document.getElementById("chart_example"));
    myChart.setOption({
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["地区数", "增幅"]
      },
      xAxis: {
        type: "category",
        data: ["华南", "华东", "中区", "华北"]
      },
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "地区数",
          max: 50,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: "value",
          scale: true,
          name: "增幅",
          max: 1,
          min: 0,
        //   data: [0.5, 0.2, 0.36, 1],
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: "地区数",
          type: "bar",
          data: [5, 20, 36, 10]
        },
        {
          name: "增幅",
          type: "line",
          data:(function (){
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 0.2).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        }
      ]
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
#chart_example {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

#content {
  width: 100%;
  height: 5.7rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 0.4rem 0px rgba(6, 19, 37, 0.1);
  border-radius: 0.2rem;
  margin-bottom: 0.3rem;
  h2{
      padding: 0;
      font-size:.32rem;
      color:rgba(24,49,77,1);
      height:.8rem;
      font-weight: 600;
      line-height: .8rem
  }
}
</style>