import Vue from 'vue'
import Router from 'vue-router'

const Index =()=> import('@/vuepage/page/Index.vue')
const IndexNew =()=> import('@/vuepage/page/IndexNew.vue')
const Employee =()=> import('@/vuepage/page/Employee.vue')
const AddEmployee=()=> import('@/vuepage/page/AddEmployee.vue')
const SelectService=()=> import('@/vuepage/page/SelectService.vue')
const ClientType=()=> import('@/vuepage/page/ClientType.vue')
const leaveEmployee=()=> import('@/vuepage/page/leaveEmployee.vue')
const choiceEmployee=()=> import('@/vuepage/page/choiceEmployee.vue')
const LagalList=()=> import('@/vuepage/page/LagalList.vue')
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
      path: '/IndexNew',
      component: IndexNew,
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
      },
    },
    {
      path: '/AddEmployee',
      component: AddEmployee,
      meta: {
        title:'入职信息登记',
      },
      // children: [
      //   {
      //     path: '/SelectService',
      //     name: SelectService,
      //     component: () => import('@/vuepage/page/SelectService.vue'),
      //     meta: { title: '选择所属业务区',}
      //   },
      // ]
    },
     {
      path: '/leaveEmployee/:id',
      props: true,
      component: leaveEmployee,
      meta: {
        title:'离职信息登记',
      }
    },
    {
      path: '/choiceEmployee',
      component: choiceEmployee,
      meta: {
        title:'选择离职员工',
      }
    },
    {
      path: '/SelectService',
      component: SelectService,
      meta: {
        title:'选择所属业务区',
      }
    },
    {
      path: '/ClientType',
      component: ClientType,
      meta: {
        title:'选择服务客户名称',
      }
    },
    {
      path: '/LagalList',
      component: LagalList,
      meta: {
        title:'劳动合同牌照',
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
