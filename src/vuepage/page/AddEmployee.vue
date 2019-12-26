<!--录入员工信息-->
<template>
  <div id="page">
    <div id="main">
      <mt-field style="border-bottom: 0.5px solid #d9d9d9;" label="姓名" placeholder="请填写" @input="persist" v-model="employeeName"></mt-field>
      <mt-field style="border-bottom: 0.5px solid #d9d9d9;" label="客户工号" placeholder="请填写" @input="persist" v-model="customerEmployeeNo"></mt-field>
      <div @click="handleService">
          <mt-field style="border-bottom: 0.5px solid #d9d9d9;" label="所属业务区" v-model="organizationName">
            <!-- <img :src="imgF" style alt /> -->
            <img src="@/assets/img/right.png" height="12px" width="8px">
          </mt-field>
      </div>
      <div @click="openPicker">
        <mt-field style="border-bottom: 0.5px solid #d9d9d9;" label="入职日期" disabled placeholder="请选择" v-model="entryAt"/>
      </div>
      <div @click="handleLaga">
        <mt-field style="border-bottom: 0.5px solid #d9d9d9;" type="textarea" rows="1" label="劳动合同牌照"  v-model="legalCompanyName">
          <!-- <img :src="imgF" style alt /> -->
          <img src="@/assets/img/right.png" height="12px" width="8px">
        </mt-field>
      </div>
      <div @click="handleClient">
        <mt-field style="border-bottom: 0.5px solid #d9d9d9;" type="textarea" rows="2" label="服务客户名称" id="img-imgs" v-model="customerName"><img src="@/assets/img/right.png" height="12px" width="8px"></mt-field>
      </div>
      <!-- <mt-field style="border-bottom: 1px solid #d9d9d9;" label="服务客户名称" id="img-imgs" v-model="customerName"> -->
        <!-- <img :src="imgF" style="height:12px;width:8px" alt /> -->
        <!-- <img src="@/assets/img/right.png" height="12px" width="8px"> -->
      <!-- </mt-field> -->
      <div @click="handleType">
           <mt-field style="border-bottom: 1px solid #d9d9d9;"
            label="岗位属性"
            placeholder="请选择"
            v-model="positionTypeName"
          ></mt-field>
      </div>
      <!-- <mt-field style="border-bottom: 1px solid #d9d9d9;"
        label="岗位属性"
        placeholder="请选择"
        v-model="positionTypeName"
        @focus.native.capture="handleType"
      ></mt-field> -->
      <div class="footer">
        <mt-button class="bottom-save" @click="handleSave">保存</mt-button>
        <mt-button class="bottom-c" @click="handleSaveContinue" type="primary">保存并继续添加</mt-button>
      </div>
    </div>
        <!-- 日历框 -->
    <mt-datetime-picker
      ref="picker"
      type="date"
      @confirm="handleConfirm"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-model="value1"
    ></mt-datetime-picker>
    <!-- //岗位属性 -->
    <mt-popup
      class="sharePopup"
      style="height: 2.75rem;;"
      v-model="popupVisibleType"
      position="bottom"
    >
      <ul class="shareUl">
        <li style="display:flex;justify-content: center;"
          class="label-list"
          v-for="(item,index) in dataListType"
          :key="index"
          @click="handleDelectType(item.no,item.name)"
        >{{item.name}}</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import { addData, selectCart, positionType } from "../../server/employee";
export default {
  name: "addEmployee",
  data() {
    return {
      value: "", //搜索内容
      employeeName: JSON.parse(localStorage.getItem('employeeName')), //姓名
      customerEmployeeNo: JSON.parse(localStorage.getItem('customerEmployeeNo')), //工号
      organizationalId: JSON.parse(localStorage.getItem('id')), //所属业务区id
      organizationName: JSON.parse(localStorage.getItem('organizationName')), //所属业务区名称
      entryAt:JSON.parse(localStorage.getItem('entryAt')), //显示的日期
      customerId: JSON.parse(localStorage.getItem('customerId')), //所选客户id
      customerName: JSON.parse(localStorage.getItem('customerName')), //所选客户名称
      positionType:JSON.parse(localStorage.getItem('positionType')), //岗位属性id
      positionTypeName: JSON.parse(localStorage.getItem('positionTypeName')), //岗位属性名称
      legalCompanyId: JSON.parse(localStorage.getItem('companyNo')), //劳动合同牌照id
      legalCompanyName: JSON.parse(localStorage.getItem('companyName')), //劳动合同牌照名称
      popupVisible: false, //劳动合同牌照的显示和隐藏
      dataList: [],
      popupVisibleType: false, //岗位属性的显示和隐藏
      dataListType: [],
      value1: "",//选择的日期
      imgF: require("@/assets/img/jiantou.png")
    };
  },
  created() {
  },
  methods: {
    showPicker(e) {
      e.preventDefault(); //阻止输入法的唤醒
    },
    persist() {
      localStorage.setItem("employeeName",JSON.stringify(this.employeeName)); //保存姓名
      localStorage.setItem("customerEmployeeNo", JSON.stringify(this.customerEmployeeNo)); //保存客户工号
    },
    //弹出日历选择
    openPicker(value1) {
      // if(this.value1){
      //       this.entryAt=this.value1
      //   }else{
      //       this.value1=new Date()
      //   }
      this.nowDate = value1;
      this.$refs.picker.open();
    },
    handleConfirm(value1) {
        localStorage.setItem("entryAt", JSON.stringify(this.$utils.date(value1))) //保存日期
      this.entryAt = this.$utils.date(value1);
    },
    //跳转到选择业务区页面
    handleService() {
      this.$router.push({
        path: "/SelectService"
      });
    },
    //跳转到选择客户页面
    handleClient() {
      this.$router.push({
        path: "/ClientType"
      });
    },
    //跳转到劳动合同牌照页面
    handleLaga() {
      this.$router.push({
        path: "/LagalList"
      });
    },
    //弹出选择岗位属性
    handleType() {
      this.popupVisibleType = true;
      const self = this;
      positionType({
        keyNo: "POST_STATION"
      }).then(e => {
        if (e.data.code == 200) {
          this.dataListType = e.data.data;
        }
      });
    },
    //选择岗位属性
    handleDelectType(no, name) {
      this.popupVisibleType = false;
      // this.positionType=no
      // this.positionTypeName=name
      localStorage.setItem("positionTypeName", JSON.stringify(name))//岗位属性名称
      localStorage.setItem("positionType", JSON.stringify(no))//岗位属性id
      this.positionType =JSON.parse(localStorage.getItem('positionType'));
      this.positionTypeName = JSON.parse(localStorage.getItem('positionTypeName'));
    },
    //点击保存
    handleSave() {
      // this.$messagebox({
      //   message: "是否确定保存",
      //   showCancelButton: true,
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消"
      // }).then(action => {
      //   if (action == "confirm") {
          addData({
            employeeName: this.employeeName,
            customerEmployeeNo: this.customerEmployeeNo,
            organizationalId: this.organizationalId? this.organizationalId: "", //所属业务id
            entryAt: this.entryAt, //选择时间
            customerId: this.customerId ? this.customerId : "", //客户id,
            positionType: this.positionType, //"岗位属性id
            legalCompanyId: this.legalCompanyId //劳动合同牌照Id
          }).then(e => {
            if (e.data.code == 200) {
              this.$router.push({
                path: "/Employee"
              });
              this.$messagebox({
                message: "保存成功",
                showCancelButton: true
              });
            } else if (e.data.code != 200) {
              this.$messagebox({
                message: e.data.message,
                showCancelButton: true
              });
            }
          });
        // }
      // });
    },
    //保存并继续添加
    handleSaveContinue() {
      //  this.$messagebox({
      //   message: '是否确定保存并继续',
      //   showCancelButton: true,
      //   confirmButtonText:"确定",
      //   cancelButtonText:"取消"
      // }).then(action => {
      //   if(action == 'confirm'){
      addData({
        employeeName: this.employeeName,//客户姓名
        customerEmployeeNo: this.customerEmployeeNo,//客户工号
        organizationalId: this.organizationalId ? this.organizationalId : "", //所属业务id
        entryAt: this.entryAt, //选择时间
        customerId: this.customerId ? this.customerId : "", //客户id
        positionType: this.positionType,//岗位属性
        legalCompanyId: this.legalCompanyId //劳动合同id
      }).then(e => {
        if (e.data.code == 200) {
           localStorage.removeItem('employeeName')
            localStorage.removeItem('customerEmployeeNo')
          //继续填写清空表格数据
            this.employeeName = ""
            this.customerEmployeeNo = ""
            // this.$messagebox({
            //     message: "保存成功",
            //     showCancelButton: true
            //   });
        } else if (e.data.code != 200) {
          this.$messagebox({
            message: e.data.message,
            showCancelButton: true
          });
        }
      });
      //   }
      //   })
    }
  }
};
</script>

<style lang="less" scoped>
#img-imgs .mint-cell-value{
  flex:  0 0 82% !important
}
#page {
  height: 100%;
  position: relative;
  width: 100%;
  .sharePopup{
    overflow-y: auto;
    width: 100%;
    }
  #main {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    // bottom: 1.58rem;
    bottom: 0;
    // border-bottom: 1px solid #ccc;
    overflow-x: hidden;
    overflow-y: auto;

    .footer {
        position: absolute;
        // bottom: .7rem;
        bottom: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 1.58rem;
        background: #fff;
        .bottom-save {
        height: 0.72rem;
        width: 1.6rem;
        font-size: 14px;
        background: rgba(235, 159, 75, 1);
        color: #fff;
        margin-right: 0.15rem;
        }
        .bottom-c {
        width: 4rem;
        font-size: 14px;
        height: 0.72rem;
        margin-left: 0.15rem;
        }
    }
  }
}
.label-list {
  height: 0.9rem;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid rgba(220, 223, 230, 1);
  padding-left: 0.2rem;
}
.mint-cell-wrapper{
  border:.002rem solid #d9d9d9d9
}
</style>