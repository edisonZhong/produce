<!--录入员工信息-->
<template>
  <div id="page">
    <div id='main'>
      <router-link to="/choiceEmployee">
        <div class="jian">
          <mt-field class="line" label="离职员工" :placeholder="employeeName" v-model="employeeName" disabled>
            <img src="@/assets/img/right.png" height="12px" width="8px">
          </mt-field>
        </div>
      </router-link>
      <mt-field label="所属业务区" placeholder="系统自动带出" v-model="employeeArea" disabled/>
      <mt-field label="客户工号" placeholder="系统自动带出" v-model="customerEmployeeNo" disabled/>
      <mt-field label="入职日期" placeholder="系统自动带出" v-model="organizationalId" disabled/>
      <div class="line" @click="openPicker(0)">
        <mt-field label="离职日期" placeholder="请选择" disabled v-model="entryAt"/>
      </div>
      <mt-field label="离职原因" placeholder="请填写" v-model="positionType"/>
      <div class="line" @click="openPicker(1)">
        <mt-field label="开始缴纳社保月份" placeholder="系统自动带出" disabled v-model="entryAt1">
          <img src="@/assets/img/del.png" height="17px" width="17px" @click.stop @click="clearInput('entryAt1')">
        </mt-field>
      </div>
      <div class="line" @click="openPicker(2)">
        <mt-field label="最后缴纳社保月份" placeholder="请选择" v-model="entryAt2" disabled>
          <img src="@/assets/img/del.png" height="17px" width="17px"  @click.stop @click="clearInput('entryAt2')">
        </mt-field>
      </div>
      <div class="footer" v-show="hideshow">
        <mt-button class="bottom-save" @click="handleSave(1)">保存</mt-button>
        <mt-button class="bottom-c" type="primary" @click="handleSave(0)">保存并继续添加</mt-button>
      </div>
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
  </div>
</template>

<script>
  import {getEmployeeById, addDepartureEmployee} from '../../server/employee'
  import {MessageBox, Indicator} from 'mint-ui';

  export default {
    name: 'addEmployee',
    data() {
      //     var loginName = (rule, value, callback) => {
      //     if (!value) {
      //       return callback(new Error('请输入手机号 / 用户名'));
      //     }else{
      //       callback();
      //     }
      //     }
      // var passWord = (rule, value, callback) => {
      //     if (!value) {
      //       return callback(new Error('请输入密码'));
      //     }else{
      //       callback();
      //     }
      //     }
      return {
        employeeName: '',//姓名
        value: '',
        employeeArea: '',//所属区域
        customerEmployeeNo: '',//工号
        organizationalId: '',//所属业务区
        entryAt: '',//离职日期
        entryAt1: '',//社保日期
        entryAt2: '',//结束社保日期
        customerId: '',
        positionType: '',
        nowDate: '',
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hideshow:true,  //显示或者隐藏footer
      }
    },
    created() {
      this.getUserData();
    },
    mounted() {
      // window.onresize监听页面高度的变化
      window.onresize = ()=>{
        return(()=>{
          this.showHeight = document.body.clientHeight;
        })()
      }
    },
    //监听
    watch: {
      showHeight: function () {
        if (this.docmHeight > this.showHeight) {
          this.hideshow = false
        } else {
          this.hideshow = true
        }
      }
    },
    methods: {
      clearInput(input){
        this[input] = " ";
      },
      openPicker(value) {
        // if(this.value){
        //       this.entryAt=this.value
        //   }else{
        //       this.value=new Date()
        //   }
        this.value = new Date()
        this.nowDate = value;
        this.$refs.picker.open();
        switch (this.nowDate) {
          case 0:
            ''
            break;
          case 1:
            this.$refs.picker.$el.getElementsByClassName('picker-slot')[2].style.display = 'none'
            break;
          case 2:
            this.$refs.picker.$el.getElementsByClassName('picker-slot')[2].style.display = 'none'
            break;
        }

      },
      handleConfirm(value) {
        switch (this.nowDate) {
          case 0:
            this.entryAt = this.$utils.date(value, '4');
            break;
          case 1:
            this.entryAt1 = this.$utils.date(value, '5');
            break;
          case 2:
            this.entryAt2 = this.$utils.date(value, '5');
            break;
        }

        console.log(this.entryAt);
      },
      handleService() {
        this.$router.push({
          path: '/SelectService'
        })
      },
      getUserData: function () {
        const userid = this.$route.params.id, _this = this;
        Indicator.open();
        getEmployeeById(userid).then(e => {
          Indicator.close();
          let {employeeName, organizationName, customerEmployeeNo, entryAt, socialSecurityStartAt} = e.data.data;
          entryAt = _this.$utils.date(entryAt, '4');
          socialSecurityStartAt = socialSecurityStartAt == null ? '' : _this.$utils.date(socialSecurityStartAt, '5');
          if (e.data.code == 200) {
            _this.employeeName = employeeName;
            _this.employeeArea = organizationName;
            _this.customerEmployeeNo = customerEmployeeNo;
            _this.organizationalId = entryAt;
            _this.entryAt1 = socialSecurityStartAt || ' ';
          }
        });
      },
      handleClient() {
        this.$router.push({
          path: '/ClientType'
        })
      },
      openlabour() {
        this.$refs.picker.open();
      },
      handleType() {
        console.log(1)
      },
      handleSave: function (type) {
        const userid = this.$route.params.id, _this = this;
        let {organizationalId, entryAt, entryAt1, entryAt2} = this;
        organizationalId = new Date(organizationalId);
        entryAt = new Date(entryAt);
        entryAt1 = new Date(entryAt1);
        entryAt2 = new Date(entryAt2);
        if (userid === 'id') {
          MessageBox({
            title: '提示',
            message: '请先选择离职员工',
          });
          return;
        }
        if (this.positionType === '' || this.entryAt === '') {
          MessageBox({
            title: '提示',
            message: '请填写完整信息',
          });
          return;
        }
        if (entryAt < organizationalId) {
          MessageBox({
            title: '提示',
            message: '离职日期不能小于入职日期!',
          });
          return;
        }
        if (entryAt2 < entryAt1) {
          MessageBox({
            title: '提示',
            message: '结束缴纳日期不能小于开始缴纳日期!',
          });
          return;
        }
        addDepartureEmployee({
          "employee_id": userid,
          "resignationAt": this.entryAt,
          "resignationReason": this.positionType,//所属业务id
          "socialSecurityStartAt": (this.entryAt1===' ')?'':this.entryAt1,
          "socialSecurityEndAt":  (this.entryAt2===' ')?'':this.entryAt2,
        }).then(e => {
          if (e.data.code === 200) {
            type ? (_this.$router.push('/Employee'), MessageBox({
              title: '提示',
              message: "离职信息登记完成",
            })) : (_this.$router.push('/leaveEmployee/id'), _this.$router.go(0));
          } else {
            MessageBox({
              title: '提示',
              message: e.data.message,
            });
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  html,body{
    position:relative!important;
    height:100% !important;
    min-height:100% !important;
  }
  a {
    color: black;
  }

  .mint-cell-value {
    flex: 0 0 73% !important;
  }

  .mint-cell-wrapper {
    padding-right: 0px;
  }

  .mint-cell:last-child {
    background-image: none;
  }

  #page {
    height: 100%;
    position: relative;
    width: 100%;

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
      overflow-y: auto

    }
  }

  #main > a {
    // border-bottom: 1px solid #d9d9d9;
  }

  .line {
    // border-bottom: 1px solid #d9d9d9;
  }

  .bottom-save {
    height: .8rem;
    width: 1.6rem;
    font-size: 16px;
    background: rgba(235, 159, 75, 1);
    color: #fff;
    margin-right: 0.15rem;
  }

  .bottom-c {
    width: 4rem;
    font-size: 16px;
    height: 0.8rem;
    margin-left: 0.15rem;
  }

  .footer {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 1.58rem;
    background: #fff;
  }

</style>
