<template>
    <div id="page">
        <!-- 员工信息 -->
        <div id="header">
            <p>序号</p>
            <p>姓名</p>
            <p>客户工号</p>
            <p>入职日期</p>
        </div>
        <div id="main">
            <ul style="height: 50px;width: 100%;">
                <li>
                   <p>1</p> 
                   <p>张三</p> 
                   <p>10000000</p> 
                   <p>2019-10-08</p> 
                </li>
                <li>
                   <p>1</p> 
                   <p>张三</p> 
                   <p>10000000</p> 
                   <p>2019-10-08</p> 
                </li>
                <li>
                   <p>1</p> 
                   <p>张三</p> 
                   <p>10000000</p> 
                   <p>2019-10-08</p> 
                </li>
                <li>
                   <p>1</p> 
                   <p>张三</p> 
                   <p>10000000</p> 
                   <p>2019-10-08</p> 
                </li>
                <li>
                   <p>1</p> 
                   <p>张三</p> 
                   <p>10000000</p> 
                   <p>2019-10-08</p> 
                </li>
            </ul>
        </div>
        <!-- <ul id="footer">
            
                <li><a>7</a><span>统计报表</span></li>
                <li><a>7</a><span>员工信息</span></li>
          
        </ul> -->

        <mt-tabbar  fixed>
      <mt-tab-item id="统计报表">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        <span>@</span>
        统计报表
      </mt-tab-item>
      <mt-tab-item id="员工信息">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        <span>@</span>

        员工信息
      </mt-tab-item>
    </mt-tabbar>
    </div>
</template>



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
            }
        }
    }
    #footer{
        background: rgba(248,248,248,1);
        width: 100%;
        position: absolute;
        bottom:0;
        left: 0;
        right:0;
        display: flex;
        height: 50px;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        li{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            height: 100%;
            // color: #EB9F4B;
        }
        // li:focus
        // { 
        // color: #EB9F4B;
        // }
    }
}
</style> 