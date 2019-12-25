import Vue from 'vue'
import Router from 'vue-router'

const Index =()=> import('@/vuepage/page/Index.vue')
const Employee =()=> import('@/vuepage/page/Employee.vue')
const AddEmployee=()=> import('@/vuepage/page/AddEmployee.vue')
const SelectService=()=> import('@/vuepage/page/SelectService.vue')
const ClientType=()=> import('@/vuepage/page/ClientType.vue')
const leaveEmployee=()=> import('@/vuepage/page/leaveEmployee.vue')
const choiceEmployee=()=> import('@/vuepage/page/choiceEmployee.vue')
Vue.use(Router)


export default new Router({
  routes: [
    {
      path:'/',
      component:Index,
      meta:{
        theIndex: "1",
        title:'首页'
      }
    },
    {
      path: '/Index',
      component: Index,
      meta: {
        theIndex: "1",
        title:'首页',
      }
    },
    {
      path: '/Employee',
      component: Employee,
      meta: {
        theIndex: "2",
        title:'员工信息',
      }
    },
    {
      path: '/AddEmployee',
      component: AddEmployee,
      meta: {
        title:'录入员工信息',
        // keepAlive:true
      }
    },
     {
      path: '/leaveEmployee/:id',
      props: true,
      component: leaveEmployee,
      meta: {
        title:'录入离职员工信息',
      }
    },
    {
      path: '/choiceEmployee',
      component: choiceEmployee,
      meta: {
        title:'选择客户名称',
      }
    },
    {
      path: '/SelectService',
      component: SelectService,
      meta: {
        title:'选择业务区',

      }
    },
    {
      path: '/ClientType',
      component: ClientType,
      meta: {
        title:'选择客户名称',
      }
    },
     {
      path: '*',
      component: Index,
      redirect:'/Index',
      meta: {
        theIndex: "1",
        title:'首页'
      }
    }
  ]
})
