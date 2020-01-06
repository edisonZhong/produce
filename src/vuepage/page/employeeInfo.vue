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
        <mt-field label="名族" placeholder="" :value="userInfo['national']" disabled/>
      </div>
    </div>
    <div class="emInfo-item">
      <div class="emInfo-item-title">员工状态</div>
      <div class="emInfo-item-con">
        <mt-field label="员工状态" placeholder="" :value="userInfo['status']" disabled/>
        <mt-field label="入职日期" placeholder="" :value="userInfo['entryAt']" disabled/>
        <mt-field label="离职日期" placeholder="" :value="userInfo['resignationAt']" disabled/>
        <mt-field label="结束缴纳社保月份" placeholder="" :value="userInfo['socialSecurityEndAt']" disabled/>
<!--        <mt-cell title="离职原因" class="ellipsis_2">-->
<!--          <div class="name-list">{{item['legalCompanyName']}}</div>-->
<!--        </mt-cell>-->
      </div>
    </div>
    <div class="emInfo-item">
      <div class="emInfo-item-title" v-if="userInfo['employeeContractList'].length">合同信息</div>
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
        <mt-field label="职位" placeholder="" :value="userInfo['positionType']" disabled/>
        <mt-field label="服务开始时间" placeholder="" :value="userInfo['customerStartAt']" disabled/>
        <mt-field label="工作地点" placeholder="" :value="userInfo['customerWorkAddress']" disabled/>
        <mt-field label="所属客户组织" placeholder="" :value="userInfo['customerOrganization']" disabled/>
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
      }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      //初始化数据获取员工信息
      init: async function () {
        Indicator.open();
        const {id: userId} = this.$route.params,
          _this = this;
        let ContractList, dictionary;
        await getEmployeeById(userId).then(res => {
          let {data, data: {employeeContractList}} = res.data;
          ContractList = employeeContractList;
          data.birthAt = utils.date(data.birthAt, 4);
          data.customerStartAt = utils.date(data.customerStartAt, 4);
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
            getByNo(dictionary).then(res => {
              const {data: result} = res.data;
              dictionary = result;
              ContractList[index].contractEndAt = utils.date(item.contractEndAt, 4);
              ContractList[index].contractStartAt = utils.date(item.contractStartAt, 4);
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

