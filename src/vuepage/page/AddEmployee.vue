<!--录入员工信息-->
<template>
  <div id="page">
    <div id="main">
      <div>
        <mt-field class="inputs" label="姓名" :placeholder="placeholder"
                  @focus.native.capture="handleCommentFocus"
                  @blur.native.capture="phoneBlur"
                  @input="persist" v-model="employeeName"></mt-field>
      </div>
      <div>
        <mt-field label="客户工号" @blur.native.capture="phoneBlur" :placeholder="placeholderFocus"
                  @focus.native.capture="handleComment" @input="persist" v-model="customerEmployeeNo"></mt-field>
      </div>
      <div @click="openPicker">
        <mt-field label="入职日期" disabled placeholder="请选择" v-model="entryAt"/>
      </div>
      <div @click="handleType">
        <mt-field
          label="岗位属性"
          placeholder="请选择"
          disabled
          v-model="positionTypeName"
        ></mt-field>
      </div>
      <div @click="handleClient">
        <mt-cell title="服务客户名称" class="ellipsis_2">
          <div class="name-list">{{customerName}}</div>
          <img src="@/assets/img/right.png" height="12px" width="8px">
        </mt-cell>
      </div>
      <div @click="handleLaga">
        <mt-cell title="劳动合同牌照" class="ellipsis_2">
          <div class="name-list">{{legalCompanyName}}</div>
          <img src="@/assets/img/right.png" height="12px" width="8px">
        </mt-cell>
      </div>
      <div @click="handleService">
        <mt-field label="所属业务区" v-model="organizationName">
          <img src="@/assets/img/right.png" height="12px" width="8px">
        </mt-field>
      </div>
      <div class="footer" v-if="type!='fix'">
        <mt-button class="bottom-save" @click="handleSave">保存</mt-button>
        <mt-button class="bottom-c" @click="handleSaveContinue" type="primary">保存并继续添加</mt-button>
      </div>
      <div class="footer" v-if="type=='fix'">
        <mt-button class="bottom-save new_button" @click="comfirmChange">保存</mt-button>
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
        >{{item.name}}
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>

  import {Toast} from "mint-ui";
  import {addData, selectCart, positionType,fixInfo} from "../../server/employee";

  export default {
    name: "addEmployee",
    data() {
      return {
        toastInstanse: null,
        value: "", //搜索内容
        employeeName: JSON.parse(localStorage.getItem('employeeName')), //姓名
        customerEmployeeNo: JSON.parse(localStorage.getItem('customerEmployeeNo')), //工号
        organizationalId: JSON.parse(localStorage.getItem('id')), //所属业务区id
        organizationName: JSON.parse(localStorage.getItem('organizationName')), //所属业务区名称
        entryAt: JSON.parse(localStorage.getItem('entryAt')), //显示的日期
        customerId: JSON.parse(localStorage.getItem('customerId')), //所选客户id
        customerName: JSON.parse(localStorage.getItem('customerName')), //所选客户名称
        positionType: JSON.parse(localStorage.getItem('new_positionType')), //岗位属性id
        positionTypeName: JSON.parse(localStorage.getItem('new_positionTypeName')), //岗位属性名称
        legalCompanyId: JSON.parse(localStorage.getItem('companyId')), //劳动合同牌照id
        legalCompanyName: JSON.parse(localStorage.getItem('companyName')), //劳动合同牌照名称
        popupVisible: false, //劳动合同牌照的显示和隐藏
        dataList: [],
        popupVisibleType: false, //岗位属性的显示和隐藏
        dataListType: [],
        value1: "",//选择的日期
        imgF: require("@/assets/img/jiantou.png"),
        placeholder: '请填写',
        placeholderFocus: '请填写',
        contractId:'',
        type:'',
        box:{}
      };
    },
    created() {
      // 如果是从修改页面过来，且本地有携带修改前员工数据
      // console.log(this.$route,'d');
      if(localStorage.getItem('info')&&localStorage.getItem('from_where')){
        this.$utils.changeTitle('员工信息编辑');

        this.type = localStorage.getItem('from_where');
        console.log(JSON.parse(localStorage.getItem('info')),'fin');
        let val = JSON.parse(localStorage.getItem('info'));
        this.box = val;
        // 页面显示
        this.employeeName = val.employeeName;//员工姓名
        this.customerEmployeeNo = val.customerEmployeeNo;//客户工号
        this.entryAt = this.$utils.date(val.entryAt,1);//入职日期
        // 岗位属性
        this.positionType = localStorage.getItem('new_positionType')?JSON.parse(localStorage.getItem('new_positionType')):val.positionType_;//岗位属性id
        this.positionTypeName = localStorage.getItem('new_positionTypeName')?JSON.parse(localStorage.getItem('new_positionTypeName')):val.positionType;//岗位属性名称
        // 服务客户名称
        this.customerName = localStorage.getItem('customerName')?JSON.parse(localStorage.getItem('customerName')):val.customerName;//服务客户名称
        this.customerId = localStorage.getItem('customerId')?JSON.parse(localStorage.getItem('customerId')):val.customerId;
        // 劳动合同牌照
        this.legalCompanyName = localStorage.getItem('companyName')?JSON.parse(localStorage.getItem('companyName')):val.employeeContractList.length?val.employeeContractList[0].legalCompanyName:'';
        this.legalCompanyId = localStorage.getItem('companyId')?JSON.parse(localStorage.getItem('companyId')):val.employeeContractList.length?val.employeeContractList[0].legalCompanyId:'';
        this.contractId = val.employeeContractList.length?val.employeeContractList[0].id:0;
        // 所属业务区
        this.organizationName = localStorage.getItem('organizationName')?JSON.parse(localStorage.getItem('organizationName')):val.organizationName//所属业务区
        this.organizationalId = localStorage.getItem('id')?JSON.parse(localStorage.getItem('id')):val.organizationalId;

        // localStorage.setItem('new_positionType',val.positionType_)
        // console.log(JSON.parse(localStorage.getItem('companyName')),'nameeee---');
        // if(JSON.parse(localStorage.getItem('companyName'))){//去子页面选择参数
        //   this.legalCompanyName = JSON.parse(localStorage.getItem('companyName'));
        //   this.legalCompanyId =  JSON.parse(localStorage.getItem('companyId'));
        // }else{//获取父页面携带参数
        //   this.legalCompanyName =val.employeeContractList.length?val.employeeContractList[0].legalCompanyName:'';//劳动合同牌照
        //   this.legalCompanyId = val.employeeContractList.length?val.employeeContractList[0].legalCompanyId:0;
        // }


        // (userInfo['entryAt'],1)
      }
    },
    methods: {
      //获取焦点
      handleCommentFocus() {
        this.placeholder = ''
      },
      handleComment() {
        this.placeholderFocus = ''
      },
      //失去焦点
      phoneBlur() {
        this.placeholder = '请填写'
        this.placeholderFocus = '请填写'
      },

      //存输入的姓名和客户工号
      persist() {
        localStorage.setItem("employeeName", JSON.stringify(this.employeeName)); //保存姓名
        localStorage.setItem("customerEmployeeNo", JSON.stringify(this.customerEmployeeNo)); //保存客户工号
      },
      //弹出日历选择
      openPicker(value1) {
        this.value1 = new Date()
        this.nowDate = value1;
        this.$refs.picker.open();
      },
      //选择日期
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
            console.log(this.dataListType,'dataListTypeeeee');
          }
        });
      },
      //选择岗位属性
      handleDelectType(no, name) {
        this.popupVisibleType = false;
        // this.positionType=no
        // this.positionTypeName=name
        // localStorage.setItem("positionTypeName", JSON.stringify(name))//岗位属性名称
        // localStorage.setItem("positionType", JSON.stringify(no))//岗位属性id
        // this.positionType = JSON.parse(localStorage.getItem('positionType'));
        // this.positionTypeName = JSON.parse(localStorage.getItem('positionTypeName'));
        this.positionTypeName = name;
        this.positionType = no;

        localStorage.setItem('new_positionType',JSON.stringify(this.positionType))
        localStorage.setItem('new_positionTypeName',JSON.stringify(this.positionTypeName))

      },
      comfirmChange(){
        console.log(this.positionType,'32145');
        // return
        fixInfo({
          employeeName: this.employeeName,
          customerEmployeeNo: this.customerEmployeeNo,
          organizationalId: this.organizationalId ? this.organizationalId : "", //所属业务id
          entryAt: this.entryAt, //选择时间
          customerId: this.customerId ? this.customerId : "", //客户id,
          positionType: this.positionType, //"岗位属性id
          legalCompanyId: this.legalCompanyId, //劳动合同牌照Id
          contractId:this.contractId,
          id:localStorage.getItem('from_id')
          // legalCompanyId:JSON.parse(localStorage.getItem('companyId'))//劳动合同牌照Id

        }).then(e => {
          if (e.data.code == 200) {
            // 保存成功清除，保存的无用缓存
            // 岗位属性
            localStorage.removeItem('new_positionTypeName');
            localStorage.removeItem('new_positionType');
            // 服务客户名称
            localStorage.removeItem('customerName');
            localStorage.removeItem('customerId');
            // 劳动合同牌照
            localStorage.removeItem('companyName');
            // localStorage.removeItem('companyNo');
            localStorage.removeItem('companyId');
            // 所属业务区
            localStorage.removeItem('organizationName');
            localStorage.removeItem('id');




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
      },
      //点击保存
      handleSave() {
        addData({
          employeeName: this.employeeName,
          customerEmployeeNo: this.customerEmployeeNo,
          organizationalId: this.organizationalId ? this.organizationalId : "", //所属业务id
          entryAt: this.entryAt, //选择时间
          customerId: this.customerId ? this.customerId : "", //客户id,
          positionType: this.positionType, //"岗位属性id
          legalCompanyId: this.legalCompanyId //劳动合同牌照Id
          // legalCompanyId:JSON.parse(localStorage.getItem('companyId'))//劳动合同牌照Id

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
      },
      //保存并继续添加
      handleSaveContinue() {
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
            Toast({
              message: '保存成功，请继续添加',
              position: 'middle',
              duration: 1000
            });
            localStorage.removeItem('employeeName')
            localStorage.removeItem('customerEmployeeNo')
            //继续填写清空表格数据
            this.employeeName = ""
            this.customerEmployeeNo = ""
          } else if (e.data.code != 200) {
            this.$messagebox({
              message: e.data.message,
              showCancelButton: true
            });
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .name-list {
    text-align: right !important;
  }

  .name-list {
    color: black !important;
  }

  #img-imgs .mint-cell-value {
    flex: 0 0 82% !important
  }

  .name-list {
    width: 4.2rem;
    padding: 0.1rem 0.1rem 0.1rem .2rem;
    line-height: 0.4rem;
    box-sizing: border-box;
  }

  #page {
    height: 100%;
    position: relative;
    width: 100%;

    .sharePopup {
      overflow-y: auto;
      width: 100%;
    }

    #main {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;

      .footer {
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 1.58rem;
        background: #fff;
        font-size: 16px;

        .bottom-save {
          height: 0.72rem;
          width: 1.6rem;
          font-size: 16px;
          background: rgba(235, 159, 75, 1);
          color: #fff;
          margin-right: 0.15rem;
        }

        .bottom-c {
          width: 4rem;
          font-size: 16px;
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
    border-bottom: 0.5px solid #f2f2f2;
    padding-left: 0.2rem;
  }

  .mint-cell-wrapper {
    border: .002rem solid #f2f2f2
  }
  .footer .new_button{
    width: 100%!important;
    margin-left: 1rem!important;
    margin-right: 1rem!important;
  }
</style>
