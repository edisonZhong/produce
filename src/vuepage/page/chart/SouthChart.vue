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
        <h2>昨日入职员工<span class="number">{{this.boxLideDay.titleInfo?this.boxLideDay.titleInfo[0][1]:'0'}}</span>人</h2>
          <div id="dataChart" class="chart"></div>
      </div>
     <div id="content">
          <h2 v-if="this.boxLideLive.valueInfo&&this.boxLideLive.valueInfo[0][1]">昨日离职员工 <span class="number">{{this.boxLideLive.valueInfo[0][1]}}</span> 人</h2>
          <h2 v-else>昨日离职员工 <span class="number">0</span> 人</h2>
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
    init(domNode,barLength) {
      let chartName = echarts.init(document.getElementById(domNode));
      this.autoHeight =barLength * 35 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
      chartName.getDom().style.height = this.autoHeight + "px";
      // chartName.getDom().childNodes[0].style.height = this.autoHeight + "px";
      // chartName.getDom().childNodes[0].childNodes[0].setAttribute("height",this.autoHeight);
      // chartName.getDom().childNodes[0].childNodes[0].style.height = this.autoHeight + "px";
      chartName.resize();
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
            // max:Math.max(...[12,12,1,2,12,12,1232,12,1,2,1,2,1,2,12,1,2,12,1,2,1,2,1,2,1,2,4,34,32,5342,32,1,12]),
            // min:Math.min(...[12,12,1,2,12,12,1232,12,1,2,1,2,1,2,12,1,2,12,1,2,1,2,1,2,1,2,4,34,32,5342,32,1,12]),
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
              boundaryGap:[0, 0.01],
              data:this.boxBar.nameList[0],
              // data:['1','2','3','4','5','6','7','8','9','10','12','13','14','15','16','17','18','19','20','21','22','23'
              // ,'24','25','26','27','28','29','30','31','32','33'],
              axisLabel:{
                fontSize:parseInt(0.3*localStorage.getItem('font'))
              },
              axisTick:{
                show:false
              },
              axisLine:{
                // color:'#999'
                lineStyle:{
                  color:'#ccc'
                }
              },
              axisLabel:{
                color:'#333'
              },
              // splitLine:{
              //   lineStyle:{
              //     color:['#ccc']
              //   }
              // }
            },
          ],
        series: [
          {
            name: '',
            type: 'bar',
            data: this.boxBar.totalList[0],
            // data:[12,12,1,2,12,12,1232,12,1,2,1,2,1,2,12,1,2,12,1,2,1,2,1,2,1,2,4,34,32,5342,32,1,12],
            // barWidth:8,
            label: {
                  normal: {
                      show: true,
                      position: 'right'
                  }
              },
               itemStyle:{
                normal:{
                    color: function (params) {
                      var colorList = that.colorBox(that.boxBar.totalList[0]);
                      return colorList[params.dataIndex]
                  }
                }
              },

          },
        ]
      });
      this.init('chart_example',this.boxBar.totalList[0].length);
    },

    colorBox(data){
      var colorList = [];
      for(let i=0;i<data.length;i++){
        if((data.length-3)>i){
          colorList.push("#4378BE")
        }else{
          colorList.push("#ff7e50")
        }
      }
      return colorList
    },


    //员工占比
    percentEchart() {
      console.log(this.boxIncrese,'boxIncresesssss')
        echarts.init(document.getElementById("persendChart")).setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data:['员工数', '占比'],
          itemWidth:15,
          itemHeight:15,
          // textStyle:{
          //   fontSize:10
          // }
        },

      xAxis: [
        {
          type: 'category',
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
            axisLine:{
              show:false
            }
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
          },
          axisLine:{
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
          color:'#ff7e50',
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
      this.init('persendChart',this.boxIncrese.percentList[0].length);
    },
     dataChart() {
          var that = this;
          echarts.init(document.getElementById("dataChart")).setOption({
              title:{
                subtext:'入职员工数量最多地区:'+this.boxLideDay.positionDay[0][0]+",\n"+this.boxLideDay.positionDay[0][1]+','+this.boxLideDay.positionDay[0][2],
                x:'center'
              },
              tooltip: {
                trigger: "axis"
              },
              grid: {
                left: '3%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: "value",
                max: Math.max(...this.boxLideDay.percentListDay[0]),
                min: Math.min(...this.boxLideDay.percentListDay[0]),
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
                  data:this.boxLideDay.positionDay[0],
                  axisTick:{
                      show:false
                  },
                  axisLine:{
                    // color:'#999'
                    lineStyle:{
                      color:'#ccc'
                    }
                  },
                  axisLabel:{
                    color:'#333'
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
                      color: function (params) {
                          var colorList = that.colorBox(that.boxLideDay.percentListDay[0]);
                          return colorList[params.dataIndex]
                      }
                    }
                  },
                },
              ]
          });
        this.init('dataChart',this.boxLideDay.percentListDay[0].length);
    },
    dataChartLive() {
        var that = this;
        echarts.init(document.getElementById("dataChartLive")).setOption({
        tooltip: {
          trigger: "axis"
        },
        title:{
          subtext:'离职员工数量最多地区:'+this.boxLideLive.positionLive[0][0]+","+this.boxLideLive.positionLive[0][1]+','+this.boxLideLive.positionLive[0][2],
          x:'center'
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
          max:Math.max(...this.boxLideLive.percentListLive[0]),
          min:Math.min(...this.boxLideLive.percentListLive[0]),
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
            data:this.boxLideLive.positionLive[0],
            scale: true,
            axisTick:{
                show:false
            },
            axisLine:{
              // color:'#999'
              lineStyle:{
                color:'#ccc'
              }
            },
            axisLabel:{
              color:'#333'
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
                  color: function (params) {
                      var colorList = that.colorBox(that.boxLideLive.percentListLive[0]);
                      return colorList[params.dataIndex]
                  }
                }
              },
          },
        ]
        });
      this.init('dataChartLive',this.boxLideLive.positionLive[0].length);
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
