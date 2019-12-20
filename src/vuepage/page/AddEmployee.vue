<!--录入员工信息-->
<template>
    <div id="page">
        <div id='main'>
            <mt-field label="姓名" placeholder="请填写" v-model="employeeName"></mt-field>
            <mt-field label="客户工号" placeholder="请填写" v-model="customerEmployeeNo"></mt-field>
            <mt-field label="所属业务区" placeholder="请填写" v-model="organizationalId" @focus.native.capture="handleService"></mt-field>
            <mt-field label="入职日期" placeholder="请选择" v-model="entryAt" @focus.native.capture="openPicker"></mt-field>
            <mt-field label="劳动合同牌照" placeholder="请选择" v-model="positionType" @focus.native.capture="openlabour"></mt-field>
            <mt-field label="服务客户名称" placeholder="请填写" v-model="customerId" @focus.native.capture="handleClient"></mt-field>
            <mt-field label="岗位属性" placeholder="请选择" v-model="legalCompanyId"  @focus.native.capture="handleType"></mt-field>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            @confirm="handleConfirm"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="value">
        </mt-datetime-picker>
        <div class="footer">
            <mt-button class="bottom-save">保存</mt-button>
            <mt-button style="width:4rem;height:.88rem" type="primary">保存并继续添加</mt-button>
        </div>
    </div>
</template>

<script>
import {addData} from '../../server/employee'
export default {
    name:'addEmployee',
    data(){
        return{
            employeeName:'',//姓名
            value:'',
            customerEmployeeNo:'',//工号
            organizationalId:'',//所属业务区
            entryAt:'',//日期
            customerId:'',
            positionType:'',
            legalCompanyId:''
        }
    },
    methods:{
        openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(value){
          console.log(value);
      },
        handleService(){
            this.$router.push({
                path:'/SelectService'
            })
        },
        handleClient(){
            this.$router.push({
                path:'/ClientType'
            })
        },
        openlabour(){
            this.$refs.picker.open();
        },
        handleType(){
            console.log(1)
        },
        getAddData(){
            addData({
                "employeeName":this.employeeName,
                "customerEmployeeNo":this.customerEmployeeNo,
                "organizationalId":this.organizationalId,//所属业务id
                "entryAt":this.entryAt,//"2019-12-20 00:00:00",
                "customerId":this.customerId,//150,
                "positionType":this.positionType,//"POST_STATION_02",
                "legalCompanyId":this.legalCompanyId//5
            }).then(e=>{
                console.log(e);
                if(e.data.code==200){
                    console.log(e);
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
#page{
    height: 100%;
    position: relative;
    width: 100%;
    #main{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.58rem;
        // border-bottom: 1px solid #ccc;
        overflow-x: hidden;
        overflow-y: auto
    }
}
.bottom-save{
    height: .88rem;
    width: 1.6rem;
    background:rgba(235,159,75,1);
    color: #fff
}
.footer{
    position: absolute;
    // bottom: .7rem;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 1.58rem;
    background: #fff
}
</style>