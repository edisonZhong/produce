<template>
  <div class="page">
    <div class="home_page" >
     <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
     <div id="main1" style="float:left;width:100%;height: 300px"></div>
    </div>
  </div>
</template>

<script>

  import utils from '../../jslib/utils'
  import echarts from 'echarts'

  export default {
  name: 'hello',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App',

    }
  },
  mounted(){
    this.drawLine();
    this.initData();

  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '' },
            tooltip: {},
            xAxis: {
                // data: []
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]

            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
 //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'));
      // 绘制图表
      myChart.setOption({
          title : {
              text: '',//主标题
              // subtext: '纯属虚构',//副标题
              x:'center',//x轴方向对齐方式
          },
          // tooltip : {
          //     trigger: 'item',
          //     formatter: "{a} <br/>{b} : {c} ({d}%)"
          // },
          // legend: {
          //     orient: 'vertical',
          //     bottom: 'bottom',
          //     data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          // },
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  // center: ['50%', '60%'],
                  data:[
                      {value:335, name:'衬衫'},
                      {value:310, name:'羊毛衫'},
                      {value:234, name:'雪纺衫'},
                      {value:135, name:'裤子'},
                      {value:1548, name:'高跟鞋'}
                  ],
                  // itemStyle: {
                  //     emphasis: {
                  //         shadowBlur: 10,
                  //         shadowOffsetX: 0,
                  //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                  //     }
                  // }
              }
          ]
      });
    },
  }
}

</script>

<style lang="less" scoped>
  .page{
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: relative;
    .home_page {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0.96rem;
      overflow-y: auto;
    }
  }


</style>
