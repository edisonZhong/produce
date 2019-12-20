<template>
    <div id="page">
        <div id='header'>
            <div class="header-bottom">
                <mt-button class="bottom-click"
                v-for="(item,index) in btnList"
                v-on:click="addClass(index)"
                :key='index'
                v-bind:class="{ classred:index==clickIndex}"
                size="normal">{{item}}</mt-button>
            </div>
            <h2 class="title">华南大区{{test}}</h2>
        </div>
        <div class="img">
            <img :src='imgUrl' alt=""/>
        </div>
        <div id="main">
            <SouthChart></SouthChart>
            <EastChart></EastChart>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
import SouthChart from '../page/SouthChart.vue'
import EastChart from '../page/EastChart.vue'
import TabBar from './TabBar.vue'
import {getToken} from '../../server/report'

export default {
    name:'index',
    components:{
        SouthChart,
        TabBar,
        EastChart
    },

    data(){
        return{
            test:'',
            clickIndex:0,
            btnList:['每日','每周','每月'],
            imgUrl:require("@/assets/img/Oval.png")
        }
    },
    mounted(){

      console.log(this.$utils.getHashUrlParams('code'),'code');
      // alert(this.$utils.getHashUrlParams('code'),'d')
      // console.log(this.,'code');
      // 获取token
      this.getToken();
    },
    methods:{
        getToken(){
          // alert(this.$utils.getHashUrlParams('code'),'c')
          // alert(this.$utils.getUrlParams('code'),'c')
          // this.test = this.$utils.getUrlParams('code');
          // return
          getToken({
            code:this.$utils.getUrlParams('code')
            // code:''
          }).then(res=>{
            // wx.setStorageSync('park_token',res.data.data.token)
            localStorage.setItem('park_token',res.data.data.token);
            // window.location.reload();
            // console.log(res,'dd');
          })
        },
        addClass(index){
            this.clickIndex=index;
        },
    //     getData(){
    //   reportData({
    //     dateType:'D'
    //   }).then(e=>{
    //     if(e.data.code==200){
    //       this.dataName=e.data.data
    //       for (var key in this.dataName) {
    //           this.title.push(key)
    //           this.valueList.push(this.dataName[key])
    //       }
    //     //   console.log(this.title[0].split('-'));
    //       this.titles=this.title[0].split('-')//各个大区的标题
    //       this.valueList[0].map(item => this.nameList.push(item.organizationName))
    //       this.valueList[0].map(item=> this.totalList.push(item.total))
    //       this.$nextTick(()=> {
    //           this.loadEchart()
    //           this.percentEchart()
    //       })
    //     }
    //   })
    // },
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
        top:2.13rem;
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
        background: #fff
    }
}
</style>
