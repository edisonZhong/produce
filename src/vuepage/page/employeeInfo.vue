<style lang="less" scoped>
  .column {
    display: flex;
    flex-direction: column;
    /*padding-bottom: 9px;*/
  }

  .emInfo-box {
    .column();
  }

  .emInfo-item {
    .column();

    .emInfo-item-title {
      width: 100%;
      padding-bottom: 8px;
      padding-top: 8px;
      background: rgba(242, 242, 242, 1);
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 550;
      color: rgba(153, 153, 153, 1);
    }

    .ellipsis_2 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2!important;
      -webkit-box-orient: vertical;
    }

    .name-list {
      width: 4.2rem;
      padding: 0.1rem 0.1rem 0.1rem 0rem;
      line-height: 0.4rem;
      box-sizing: border-box;
      color: black;
    }
  }
  /deep/.mint-cell-wrapper{
    min-height:1rem!important;
    height:unset!important;
  }
  .emInfo-box{
    position:relative;
  }
  .fix_btn{
    width:1rem;
    height:1rem;
    border-radius:50%;
    background:#eb9f4b !important;
    position:fixed;
    bottom:2rem;
    right:.5rem;
    text-align:center;
    img{
      width:.5rem;
      vertical-align:middle;
      margin-left: .25rem;
      margin-top: .25rem;
    }
  }
</style>
<template>
  <div class="emInfo-box">
    <div class="emInfo-item">
      <div class="emInfo-item-title">个人基本信息</div>
      <div class="emInfo-item-con">
        <mt-field label="姓名" placeholder="" :value="userInfo['employeeName']" disabled/>
        <mt-field label="工号" placeholder="" :value="userInfo['customerEmployeeNo']" disabled/>
        <mt-field label="所属业务区" placeholder="" :value="userInfo['organizationName']" disabled/>
        <mt-field label="移动电话" placeholder="" :value="userInfo['employeePhone']" disabled/>
        <mt-field label="性别" placeholder="" :value="userInfo['sex']" disabled/>
        <mt-field label="出生日期" placeholder="" :value="userInfo['birthAt']" disabled/>
        <mt-field label="证件类型" placeholder="" :value="userInfo['certificateType']" disabled/>
        <mt-field label="证件号码" placeholder="" :value="userInfo['certificateNumber']" disabled/>
        <mt-field label="婚姻状况" placeholder="" :value="userInfo['maritalStatus']" disabled/>
        <mt-field label="最高学历" placeholder="" :value="userInfo['educationBackground']" disabled/>
        <mt-field label="民族" placeholder="" :value="userInfo['national']" disabled/>
      </div>
    </div>
    <div class="emInfo-item">
      <div class="emInfo-item-title">员工状态</div>
      <div class="emInfo-item-con">
        <mt-field label="员工状态" placeholder="" :value="userInfo['status']==0?'试用期':userInfo['status']==1?'在职':'离职'" disabled/>
        <mt-field label="入职日期" placeholder="" :value="this.$utils.date(userInfo['entryAt'],1)" disabled/>
        <mt-field label="离职日期" placeholder="" :value="userInfo['resignationAt']?this.$utils.date(userInfo['resignationAt'],1):''" disabled/>
        <mt-field label="结束缴纳社保月份" placeholder="" :value="userInfo['socialSecurityEndAt']?this.$utils.date(userInfo['socialSecurityEndAt'],1):''" disabled/>
<!--        <mt-cell title="离职原因" class="ellipsis_2">-->
<!--          <div class="name-list">{{item['legalCompanyName']}}</div>-->
<!--        </mt-cell>-->
      </div>
    </div>
    <div class="emInfo-item">
      <div class="emInfo-item-title" v-if="userInfo['employeeContractList']">合同信息</div>
      <div class="emInfo-item-con" v-for="item in userInfo['employeeContractList']">
        <mt-cell title="劳动合同牌照" class="ellipsis_2">
          <div class="name-list ellipsis_2">{{item['legalCompanyName']}}</div>
        </mt-cell>
        <mt-field label="期限类型" placeholder="" :value="item['contractTermType']" disabled/>
        <mt-field label="合同开始日期" placeholder="" :value="item['contractStartAt']" disabled/>
        <mt-field label="合同结束日期" placeholder="" :value="item['contractEndAt']" disabled/>
        <mt-field label="签订形式" placeholder="" :value="item['contractSignType']" disabled/>
      </div>
      <div class="emInfo-item-title">服务客户信息</div>
      <div class="emInfo-item-con">
        <mt-field label="服务客户名称" placeholder="" :value="userInfo['customerName']" disabled/>
        <mt-field label="客户工号" placeholder="" :value="userInfo['customerEmployeeNo']" disabled/>
        <mt-field label="职位" placeholder="" :value="userInfo['customerEmployeePosition']" disabled/>
        <mt-field label="岗位属性" placeholder="" :value="userInfo['positionType']" disabled/>
        <mt-field label="服务开始时间" placeholder="" :value="userInfo['customerStartAt']" disabled/>
        <mt-field label="工作地点" placeholder="" :value="userInfo['customerWorkAddress']" disabled/>
        <!-- <mt-field label="所属客户组织" placeholder="" :value="userInfo['customerOrganization']" disabled/> -->
        <mt-cell title="所属客户组织">
          <div class="name-list">{{userInfo['customerOrganization']}}</div>
        </mt-cell>
      </div>
    </div>
    <div class="emInfo-item">
      <div class="emInfo-item-title">紧急联系方式</div>
      <div class="emInfo-item-con">
        <mt-field label="紧急联系人" placeholder="" :value="userInfo['emergencyContact']" disabled/>
        <mt-field label="紧急联系方式" placeholder="" :value="userInfo['emergencyPhone']" disabled/>
      </div>
    </div>
    <div class="emInfo-item">
      <div class="emInfo-item-title">地址信息</div>
      <div class="emInfo-item-con">
        <mt-cell title="现住地址" class="ellipsis_2">
          <div class="name-list">{{userInfo['presentAddress']}}</div>
        </mt-cell>
        <mt-cell title="身份证地址" class="ellipsis_2">
          <div class="name-list">{{userInfo['certificateAddress']}}</div>
        </mt-cell>
      </div>
    </div>
    <div class="emInfo-item">
      <div class="emInfo-item-title">没有更多啦~</div>
    </div>

    <div class="fix_btn" @click='toAdd'>
      <img :src="imgurl" alt="">
    </div>
  </div>
</template>
<script>
  import {getEmployeeById, getByNo} from "../../server/employee";
  import {Indicator} from 'mint-ui';
  import utils from '../../jslib/utils'

  export default {
    name: "employeeInfo",
    components: {},
    data() {
      //这里存放数据
      return {
        userInfo: {},
        imgurl:require("@/assets/img/fix.png"),
        positionType_:''//岗位属性值
      }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      toAdd(){
        this.userInfo.positionType_ = this.positionType_;

        console.log(this.userInfo,'this.positionType_');
        // return
        localStorage.setItem('info',JSON.stringify(this.userInfo));
        localStorage.setItem('from_where',"fix");
        localStorage.setItem('from_id',this.$route.params.id);


        // 清空一些无用数据
        // 岗位属性
        localStorage.removeItem('new_positionTypeName');
        localStorage.removeItem('new_positionType');
        // 服务客户名称
        localStorage.removeItem('customerName');
        localStorage.removeItem('customerId');
        // 劳动合同牌照
        localStorage.removeItem('companyName');
        localStorage.removeItem('companyId');
        // localStorage.removeItem('companyNo');
        // 所属业务区
        localStorage.removeItem('organizationName');
        localStorage.removeItem('id');



        this.$router.push({path:'/AddEmployee'})
      },
      //初始化数据获取员工信息
      init: async function () {
        Indicator.open();
        const {id: userId} = this.$route.params,
          _this = this;
        let ContractList, dictionary;
        await getEmployeeById(userId).then(res => {
          let {data, data: {employeeContractList}} = res.data;
          console.log(data,'data321123---');
          ContractList = employeeContractList;
          data.birthAt = data.birthAt?utils.date(data.birthAt, 4):'';
          data.customerStartAt = data.customerStartAt?utils.date(data.customerStartAt, 4):'';
          if(0 === ContractList.length){
            dictionary = [{
              'certificateType': data.certificateType || '',
              'sex': data.sex || '',
              'positionType': data.positionType || '',
              'customerEmployeePosition': data.customerEmployeePosition || '',
              'maritalStatus':data.maritalStatus || '',
              'educationBackground':data.educationBackground || '',
            }];
            JSON.stringify(dictionary);
            getByNo(dictionary).then(res => {
              const {data: result} = res.data;
              // console.log(dictionary,'907967566');

              // 岗位属性接口传值
              this.positionType_ = dictionary[0].positionType;
              console.log(dictionary,'[]')

              dictionary = result;
              data.certificateType = dictionary[0].certificateType;
              data.sex = dictionary[0].sex;
              data.positionType = dictionary[0].positionType;
              data.customerEmployeePosition = dictionary[0].customerEmployeePosition;
              data.maritalStatus = dictionary[0].maritalStatus;
              data.educationBackground = dictionary[0].educationBackground;
              data.employeeContractList = ContractList;
            });
          }
          console.log(data,'dictionaryyys');
          ContractList.map((item, index) => {
            dictionary = [{
              'certificateType': data.certificateType,
              'sex': data.sex,
              'positionType': data.positionType,
              'contractTermType': item.contractTermType,
              'contractSignType': item.contractSignType,
              'customerEmployeePosition': data.customerEmployeePosition,
              'maritalStatus':data.maritalStatus,
              'educationBackground':data.educationBackground,
            }];
            JSON.stringify(dictionary);
            console.log(dictionary[0],'test9080909090-');
            // 岗位属性接口传值
            this.positionType_ = dictionary[0].positionType;
            getByNo(dictionary).then(res => {
              const {data: result} = res.data;
              dictionary = result;
              ContractList[index].contractEndAt = item.contractEndAt?utils.date(item.contractEndAt, 4):'';
              ContractList[index].contractStartAt = item.contractStartAt?utils.date(item.contractStartAt, 4):'';
              data.certificateType = dictionary[0].certificateType;
              data.sex = dictionary[0].sex;
              data.positionType = dictionary[0].positionType;
              data.customerEmployeePosition = dictionary[0].customerEmployeePosition;
              data.maritalStatus = dictionary[0].maritalStatus;
              data.educationBackground = dictionary[0].educationBackground;
              ContractList[index].contractTermType = dictionary[0].contractTermType;
              ContractList[index].contractSignType = dictionary[0].contractSignType;
              data.employeeContractList = ContractList;
            });
          });
          _this.userInfo = data;
          console.log(data,'dataa');
        });

        Indicator.close();
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      this.init();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
    },
    beforeCreate() {
    }, //生命周期 - 创建之前
    beforeMount() {
    }, //生命周期 - 挂载之前
    beforeUpdate() {
    }, //生命周期 - 更新之前
    updated() {
    }, //生命周期 - 更新之后
    beforeDestroy() {
    }, //生命周期 - 销毁之前
    destroyed() {
    }, //生命周期 - 销毁完成
    activated() {
    }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
