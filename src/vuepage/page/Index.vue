<template>
    <div id="page">
        <div id='header'>
            <mt-button class="bottom-click"
             v-for="(item,index) in btnList"  
             v-on:click="addClass(index)" 
             :key='index'
             v-bind:class="{ classred:index==clickIndex}"
            size="normal">{{item}}</mt-button>
        </div>
        <div class="img">
                <img :src='imgUrl' alt=""/>
            </div>
        <div id="main">
            <Category></Category>
        </div>
    </div>
</template>

<script>
import Category from '../page/Category.vue'
export default {
    name:'index',
    components:{
        Category
    },
    data(){
        return{
            clickIndex:0,
            btnList:['每日','每周','每月'],
            imgUrl:require("@/assets/img/Oval.png")
        }
    },
    methods:{ 
        addClass(index){ 
            this.clickIndex=index;
        }
    },
}
</script>

<style lang="less" scoped>
#page{
    height: 100%;
    position: relative;
    box-sizing: border-box;
    #header{
        height: 1.5rem;
        width: 100%;
        background:rgba(67,120,190,1);
        position: absolute;
        top:0;
        bottom:.98rem;
        left: 0;
        right:0;
        display: flex;
        justify-content: space-around;
        align-items: center;
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
        top:1.5rem;
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
        top:1.5rem;
        padding: 0 .3rem;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto
    }
}
</style>