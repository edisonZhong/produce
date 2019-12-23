<!--统计图 华南大区-->
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

            <h2 class="title">{{title}}</h2>
        </div>
        <div class="img">
            <img :src='imgUrl' alt=""/>
        </div>
        <div id="main" @scroll="handleScroll" ref="content">
            <SouthChart id='2'></SouthChart>
            <EastChart id='3'></EastChart>
            <CenterChart id='4'></CenterChart>
            <NorthChart id='5'></NorthChart>
        </div>
        <p>到底啦~~~~</p>
        <TabBar></TabBar>
    </div>
</template>

<script>
import SouthChart from '../page/chart/SouthChart'
import EastChart from '../page/chart/EastChart.vue'
import CenterChart from '../page/chart/CenterChart'
import NorthChart from '../page/chart/NorthChart'

import TabBar from './TabBar.vue'

import {getToken} from '../../server/report'


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
            title:'华南大区'
        }
    },
    mounted(){

      // console.log(this.$utils.getHashUrlParams('code'),'code');
      // alert(this.$utils.getHashUrlParams('code'),'d')
      // console.log(this.,'code');
      // 获取token
      // this.getToken();
    },
    methods:{
        // recordScrollPosition(e) {
        // this.$store.dispatch("setListTop",e.target.scrollTop);//实时存入到vuex中
        // },
        // getToken(){
        //   // alert(this.$utils.getHashUrlParams('code'),'c')
        //   // alert(this.$utils.getUrlParams('code'),'c')
        //   // this.test = this.$utils.getUrlParams('code');
        //   // return
        //   getToken({
        //     code:this.$utils.getUrlParams('code')
        //     // code:''
        //   }).then(res=>{
        //     // wx.setStorageSync('park_token',res.data.data.token)
        //     localStorage.setItem('park_token',res.data.data.token);
        //     // window.location.reload();
        //     // console.log(res,'dd');
        //   })
        // },
        addClass(index){
            this.clickIndex=index;
        },
        handleScroll(el){
            this.scrollTop = this.$refs.content.scrollTop
           
            console.log(this.$refs.content.scrollTop)
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
</style>
