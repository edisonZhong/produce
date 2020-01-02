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
  }
</style>
<template>
  <div class="emInfo-box">
    <div class="emInfo-item">
      <div class="emInfo-item-title">个人信息基本合同</div>
      <div class="emInfo-item-con">
        <mt-field label="姓名" placeholder="暂无数据" :value="userInfo['employeeName']" disabled/>
        <mt-field label="工号" placeholder="暂无数据" :value="userInfo['customerEmployeeNo']" disabled/>
        <mt-field label="所属业务区" placeholder="暂无数据" :value="userInfo['organizationName']" disabled/>
        <mt-field label="移动电话" placeholder="暂无数据" :value="userInfo['employeePhone']" disabled/>
        <mt-field label="性别" placeholder="暂无数据" :value="userInfo['sex']" disabled/>
        <mt-field label="出生日期" placeholder="暂无数据" :value="userInfo['birthAt']" disabled/>
        <mt-field label="证件类型" placeholder="暂无数据" :value="userInfo['certificateType']" disabled/>
      </div>
    </div>
    <div class="emInfo-item">
      <div class="emInfo-item-title">合同信息</div>
      <div class="emInfo-item-con" v-for="item in userInfo['employeeContractList']">
        <mt-field label="劳动合同牌照" placeholder="暂无数据" :value="item['legalCompanyName']" disabled/>
        <mt-field label="期限类型" placeholder="暂无数据" :value="item['contractTermType']" disabled/>
        <mt-field label="合同开始日期" placeholder="暂无数据" :value="item['contractStartAt']" disabled/>
        <mt-field label="合同结束日期" placeholder="暂无数据" :value="item['contractEndAt']" disabled/>
        <mt-field label="签订形式" placeholder="暂无数据" :value="item['contractSignType']" disabled/>
      </div>
      <div class="emInfo-item-title">服务客户信息</div>
      <div class="emInfo-item-con">
        <mt-field label="服务客户名称" placeholder="暂无数据" :value="userInfo['customerName']" disabled/>
        <mt-field label="客户工号" placeholder="暂无数据" :value="userInfo['customerEmployeeNo']" disabled/>
        <mt-field label="职位" placeholder="暂无数据" :value="userInfo['positionType']" disabled/>
        <mt-field label="服务开始时间" placeholder="暂无数据" :value="userInfo['customerStartAt']" disabled/>
        <mt-field label="工作地点" placeholder="暂无数据" :value="userInfo['customerWorkAddress']" disabled/>
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
        let ContractList,dictionary;
        await getEmployeeById(userId).then(res => {
          let {data, data: {employeeContractList}} = res.data;
          ContractList = employeeContractList;
          data.birthAt = utils.date(data.birthAt, 4);
          data.customerStartAt = utils.date(data.customerStartAt, 4);
          ContractList.map((item, index) => {
            dictionary = [{
              'certificateType': data.certificateType,
              'sex': data.sex,
              'positionType':data.positionType,
              'contractTermType':item.contractTermType,
              'contractSignType':item.contractSignType,
              'customerEmployeePosition':data.customerEmployeePosition
            }];
            JSON.stringify(dictionary);
            getByNo(dictionary).then(res => {
              const {data:result} = res.data;
              dictionary = result;
              ContractList[index].contractEndAt = utils.date(item.contractEndAt, 4);
              ContractList[index].contractStartAt = utils.date(item.contractStartAt, 4);
              data.certificateType = dictionary[0].certificateType;
              data.sex = dictionary[0].sex;
              data.positionType = dictionary[0].positionType;
              data.customerEmployeePosition = dictionary[0].customerEmployeePosition;
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

