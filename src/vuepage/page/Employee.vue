<!--员工信息-->
<template>
    <div id="page">
        <!-- 员工信息 -->
        <div id="header">
            <p style="text-align: center;width: 10%;">序号</p>
            <p style="text-align: center;width: 30%;">姓名</p>
            <p style="text-align: center;width: 30%;">客户工号</p>
            <p style="text-align: center;width: 30%;">入职日期</p>
        </div>
        <div id="main">
            <ul style="height: 50px;width: 100%;">
                <li>
                   <p style="text-align: center;width: 10%;">1</p> 
                   <p style="text-align: center;width: 30%;">张三</p> 
                   <p style="text-align: center;width: 30%;">A1234567</p> 
                   <p style="text-align: center;width: 30%;">2019/04/25</p> 
                </li>
                <li>
                   <p style="text-align: center;width: 10%;">1</p> 
                   <p style="text-align: center;width: 30%;">张三</p> 
                   <p style="text-align: center;width: 30%;">A1234567</p> 
                   <p style="text-align: center;width: 30%;">2019/04/25</p> 
                </li>
                <li>
                   <p style="text-align: center;width: 10%;">1</p> 
                   <p style="text-align: center;width: 30%;">张三</p> 
                   <p style="text-align: center;width: 30%;">A1234567</p> 
                   <p style="text-align: center;width: 30%;">2019/04/25</p> 
                </li>
                <li>
                   <p style="text-align: center;width: 10%;">1</p> 
                   <p style="text-align: center;width: 30%;">张三</p> 
                   <p style="text-align: center;width: 30%;">A1234567</p> 
                   <p style="text-align: center;width: 30%;">2019/04/25</p> 
                </li>
                <li>
                   <p style="text-align: center;width: 10%;">1</p> 
                   <p style="text-align: center;width: 30%;">张三</p> 
                   <p style="text-align: center;width: 30%;">A1234567</p> 
                   <p style="text-align: center;width: 30%;">2019/04/25</p> 
                </li>
            </ul>
        </div>
        <TabBar></TabBar>
        <img style="position: fixed;right: .1rem;bottom: 1.5rem" :src="imgUrl" @click="handlePush"  alt=""/>
    </div>
</template>

<script>
import TabBar from './TabBar'
export default {
    name:'employee',
    components:{TabBar},
    data(){
        return{
            imgUrl:require("@/assets/img/Group.png"),
        }
    },
    methods:{
       handlePush(){
           this.$router.push({path:'/AddEmployee'})
       }
    }
}
</script>

<style lang="less" scoped>
.page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
 
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
  .actived {
  color:rgba(235,159,75,1) !important;
}
#page{
    height: 100%;
    position: relative;
    box-sizing: border-box;
    #header{
	    width: 100%;
        height: 50px;
        background: #fff;
        position: absolute;
        top:0;
        bottom:50px;
        left: 0;
        right:0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size:12px;
        box-shadow: .22rem .22rem .22rem rgba(0, 0, 0, .1);
    }
    #main{
        position: absolute;
        top:60px;
        bottom: 50px;
        overflow-x:hidden;
        overflow-y: auto;
        width: 100%;
        left: 0;
	    right: 0;
        ul{
            li{
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100%;
                height: 100%;
                border-bottom:1px solid rgba(220,223,230,1)
            }
        }
    }
    // #footer{
    //     background: rgba(248,248,248,1);
    //     width: 100%;
    //     position: absolute;
    //     bottom:0;
    //     left: 0;
    //     right:0;
    //     display: flex;
    //     height: 50px;
    //     justify-content: space-around;
    //     align-items: center;
    //     width: 100%;
    //     li{
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: center;
    //         align-items: center;
    //         font-size: 11px;
    //         height: 100%;
    //         color:rgba(153,153,153,1);
    //         // color: #EB9F4B;
    //     }
    //     // li:focus
    //     // { 
    //     // color: #EB9F4B;
    //     // }
    // }
}
</style> 