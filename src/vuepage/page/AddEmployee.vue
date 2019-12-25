<!--录入员工信息-->
<template>
    <div id="page">
        <div id='main'>
            <mt-field  label="姓名" placeholder="请填写" @input="persist" v-model="employeeName"></mt-field>
            <mt-field  label="客户工号" placeholder="请填写" @input="persist" v-model="customerEmployeeNo"></mt-field>
            <mt-field label="所属业务区" v-model="name" @focus.native.capture="handleService"><img :src="imgF" style="" alt=""/></mt-field>
            <mt-field  label="入职日期" placeholder="请选择" @input="persist" v-model="entryAt" @focus.native.capture="openPicker"></mt-field>
            <mt-field label="劳动合同牌照" placeholder="请选择" @input="persist" v-model="legalCompanyName" @focus.native.capture="openlabour"></mt-field>
            <mt-field label="服务客户名称" v-model="customerName" @focus.native.capture="handleClient"><img :src="imgF" style="" alt=""/></mt-field>
            <mt-field  label="岗位属性" placeholder="请选择" @input="persist" v-model="positionTypeName"  @focus.native.capture="handleType"></mt-field>
            <div class="footer">
                <mt-button class="bottom-save" @click="handleSave">保存</mt-button>
                <mt-button style="width:4rem;font-size: 14px;height:.72rem;margin-left: .15rem;" @click="handleSaveContinue" type="primary">保存并继续添加</mt-button>
            </div>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            @confirm="handleConfirm"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="value1">
        </mt-datetime-picker>

        <mt-popup class="sharePopup" 
            style="height: 5rem;
                overflow-y: auto;
                width: 100%;"
            v-model="popupVisible" position="bottom">
            <ul class="shareUl">
                <li style="height:.9rem;display:flex;align-items: center;border-bottom: 1px solid rgba(220, 223, 230, 1);padding-left:.2rem" v-for="(item,index) in dataList" :key="index" @click="handleDelect(item.companyName,item.companyNo)">{{item.companyName}}</li>
            </ul>
        </mt-popup>

        <mt-popup class="sharePopup" 
            style="height: 2.75rem;;
                overflow-y: auto;
                width: 100%;"
            v-model="popupVisibleType" position="bottom">
            <ul class="shareUl">
                <li style="height:.9rem;display:flex;justify-content: center;align-items: center;border-bottom: 1px solid rgba(220, 223, 230, 1);padding-left:.2rem" 
                v-for="(item,index) in dataListType" :key="index"
                @click="handleDelectType(item.no,item.name)">{{item.name}}</li>
            </ul>
        </mt-popup>
    </div>
</template>

<script>
import {addData,selectCart,positionType} from '../../server/employee'
export default {
    name:'addEmployee',
    data(){
        return{
            value:'',//搜索内容
            employeeName:'',//姓名
            customerEmployeeNo:'',//工号
            organizationalId:localStorage.getItem("id"),//所属业务区id
            name:localStorage.getItem("organizationName"),//所属业务区名称
            entryAt:'',//日期
            customerId:localStorage.getItem("customerId"),//所选客户id
            customerName:localStorage.getItem("customerType"),//所选客户名称
            positionType:'',//岗位属性id
            positionTypeName:'',//岗位属性名称
            legalCompanyId:'',//劳动合同牌照id
            legalCompanyName:'',//劳动合同牌照名称
            popupVisible: false,//劳动合同牌照的显示和隐藏
            dataList:[],
            popupVisibleType:false,
            dataListType:[],
            value1:'',
            id3:'',
      imgF:require("@/assets/img/jiantou.png")

        }
    },
     created() {
        var organizationalId = localStorage.getItem("id"); 
        var customerId = localStorage.getItem("id"); 
        var name= localStorage.getItem("organizationName")
        if (localStorage.employeeName) {
            this.employeeName = localStorage.getItem('employeeName')
        }
        if (localStorage.customerEmployeeNo) {
            this.customerEmployeeNo = localStorage.getItem('customerEmployeeNo')
        }
        if (localStorage.entryAt) {
            this.entryAt = localStorage.getItem('entryAt')
        }
        if (localStorage.legalCompanyName) {
            this.legalCompanyName = localStorage.getItem('legalCompanyName')
        }
        if (localStorage.positionTypeName) {
            this.positionTypeName = localStorage.getItem('positionTypeName')
        }
        if (localStorage.legalCompanyId) {
            this.legalCompanyId = localStorage.getItem('legalCompanyId')
        }
        if (localStorage.positionType) {
            this.positionType = localStorage.getItem('positionType')
        }
    },
    methods:{
    persist(){
        localStorage.setItem('employeeName', this.employeeName)
        localStorage.setItem('customerEmployeeNo', this.customerEmployeeNo)
        localStorage.setItem('entryAt', this.entryAt)
        localStorage.setItem('legalCompanyName', this.legalCompanyName)
        localStorage.setItem('positionTypeName', this.positionTypeName)
        localStorage.setItem('legalCompanyId', this.legalCompanyId)
        localStorage.setItem('positionType', this.positionType)
    },
    openPicker(value1) {
        if(this.value1){
              this.entryAt=this.value1
          }else{
              this.value1=new Date()
          }
          this.$refs.picker.open();
      },
      handleConfirm(value1){
          this.entryAt=this.$utils.date(this.value1)
          console.log(this.entryAt);
      },
        handleService(){
            this.$router.push({
                path:'/SelectService'
            })
        },
        handleClient(){
            console.log(this.name);
            this.$router.push({
                path:'/ClientType'
            })
        },
        openlabour(){
            this.popupVisible=true
            selectCart().then(e=>{
                if(e.data.code==200){
                    this.dataList=e.data.data
                    
                }
            })
        },
        handleType(){
            this.popupVisibleType=true
            const self = this
            positionType({
                keyNo:'POST_STATION'
            }).then(e=>{
                if(e.data.code==200){
                    this.dataListType=e.data.data
                }
            })
        },

        handleSave(){

             this.$messagebox({
              message: '是否确定保存',
              showCancelButton: true,
              confirmButtonText:"确定",
              cancelButtonText:"取消"
            }).then(action => {
              if(action == 'confirm'){
                    addData({
                    "employeeName":this.employeeName,
                    "customerEmployeeNo":this.customerEmployeeNo,
                    "organizationalId":this.organizationalId?this.organizationalId:'',//所属业务id
                    "entryAt":this.entryAt,//this.entryAt,//this.value1?new Date(this.$utils.date(this.value1[1])).getTime()
                    "customerId":this.customerId?this.customerId:'',//150,
                    "positionType":this.positionType,//"POST_STATION_02",
                    "legalCompanyId":this.legalCompanyId//5
                }).then(e=>{
                    if(e.data.code==200){
                        this.$router.push({
                            path:'/Employee'
                        })
                         this.$messagebox({
                        message: '保存成功',
                        showCancelButton: true
                        });
                    }else if(e.data.code!=200){
                        this.$messagebox({
                        message: e.data.message,
                        showCancelButton: true
                        });
                    }
                })
              }
          })
        },
        //保存并继续
        handleSaveContinue(){
            //  this.$messagebox({
            //   message: '是否确定保存并继续',
            //   showCancelButton: true,
            //   confirmButtonText:"确定",
            //   cancelButtonText:"取消"
            // }).then(action => {
            //   if(action == 'confirm'){
                    addData({
                    "employeeName":this.employeeName,
                    "customerEmployeeNo":this.customerEmployeeNo,
                    "organizationalId":this.organizationalId?this.organizationalId:'',//所属业务id
                    "entryAt":this.entryAt,//this.entryAt,//this.value1?new Date(this.$utils.date(this.value1[1])).getTime()
                    "customerId":this.customerId?this.customerId:'',//150,
                    "positionType":this.positionType,//"POST_STATION_02",
                    "legalCompanyId":this.legalCompanyId//5
                }).then(e=>{
                    if(e.data.code==200){
                        localStorage.removeItem('employeeName')
                        localStorage.removeItem('customerEmployeeNo')
                        localStorage.removeItem('entryAt')
                        localStorage.removeItem('legalCompanyName')
                        localStorage.removeItem('positionTypeName')
                        localStorage.removeItem('legalCompanyId')
                        localStorage.removeItem('positionType')
                        localStorage.removeItem("organizationName")
                        localStorage.removeItem("customerType")
                        this.employeeName='',
                        this.customerEmployeeNo='',
                        this.organizationalId='',//所属业务id
                        this.entryAt='',//this.entryAt,//this.value1?new Date(this.$utils.date(this.value1[1])).getTime()
                        this.customerId='',//150,
                        this.positionType='',//"POST_STATION_02",
                        this.legalCompanyId=''//5
                    }else if(e.data.code!=200){
                        this.$messagebox({
                        message: e.data.message,
                        showCancelButton: true
                        });
                    }
                })
            //   }
        //   })
        },
        handleDelect(companyName,companyNo){
            this.popupVisible=false
            this.legalCompanyId=companyNo
            this.legalCompanyName=companyName
            console.log(companyName);
        },
        handleDelectType(no,name){
            this.popupVisibleType=false
            this.positionType=no
            this.positionTypeName=name
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
        // bottom: 1.58rem;
        bottom: 0;
        // border-bottom: 1px solid #ccc;
        overflow-x: hidden;
        overflow-y: auto
    }
}
.bottom-save{
    height: .72rem;
    width: 1.6rem;
    font-size: 14px;
    background:rgba(235,159,75,1);
    color: #fff;
    margin-right: .15rem;
}
.footer{
    position: absolute;
    // bottom: .7rem;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 1.58rem;
    background: #fff
}
.mint-field .mint-cell-value:nth-of-type(3) {
    flex: 0 0 82% !important;
}
</style>