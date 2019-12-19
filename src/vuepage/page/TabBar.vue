<template>
  <ul id="footer">
    <!-- <li :class="activeClass == index ? 'actived':''" 
                    v-for="(item,index) in tabList" 
                    :key="index" 
                    :to="item.path"
                    @click="handleTab(index,item.path)">
                <img style="height:19px;width:22px" :src='activeClass==index?item.iconPath:item.icon'/>
                <span>{{item.name}}</span>
    </li>-->
    <li @click="handleTab(0,'/Index')">
      <img class="img_cover" src="../../assets/img/copys.png" v-show="$route.meta.theIndex==1" />
      <img class="img_cover" src="../../assets/img/copy.png" v-show="$route.meta.theIndex!=1" />
      <!-- <span :class="activeClass == '1' ? 'actived':''">统计</span> -->
      <span v-show="$route.meta.theIndex==1" class="actived">统计</span>
      <span v-show="$route.meta.theIndex!=1" >统计</span>
    </li>
    <li @click="handleTab(1,'/Employee')">
      <img class="img_cover" src="../../assets/img/employee.png" v-show="$route.meta.theIndex==2" />
      <img class="img_cover" src="../../assets/img/employees.png" v-show="$route.meta.theIndex!=2" />
      <span v-show="$route.meta.theIndex==2" class="actived">员工信息</span>
      <span v-show="$route.meta.theIndex!=2" >员工信息</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "employee",
  data() {
    return {
      activeClass: 1,
      // ins:2,
      // imgUrl:require("@/assets/img/Group.png"),
      // tabList:[
      //     {icon:require("@/assets/img/copy.png"),iconPath:require("@/assets/img/copys.png"),name:'统计报表',path:'/Index'},
      //     {icon:require("@/assets/img/employees.png"),iconPath:require("@/assets/img/employee.png"),name:'员工信息',path:'/Employee'}
      // ]
    };
  },
  methods: {
    handleTab(val, path) {
        console.log(val);
    //   console.log(index);
      // this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
      this.$router.replace(path);
    }
  }
};
</script>
<style lang="less" scoped>
.actived {
  color: rgba(235, 159, 75, 1) !important;
}
#footer {
  background: rgba(248, 248, 248, 1);
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: .98rem;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    height: 100%;
    color: rgba(153, 153, 153, 1);
    // width: 49%;
    img{
        height: .4rem;
        width: .41rem
    }
  }
}
</style>