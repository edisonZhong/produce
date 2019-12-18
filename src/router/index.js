import Vue from 'vue'
import Router from 'vue-router'

// const Home =()=> import('@/vuepage/home/home.vue')
const Employee =()=> import('@/vuepage/page/Employee.vue')


// const Discuss =()=> import('@/vuepage/discuss/discuss.vue')
// const Order =()=> import('@/vuepage/order/order.vue')
// const My =()=> import('@/vuepage/my/my_page.vue')
Vue.use(Router)


export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: Home,
    //   meta: {
    //     // theIndex: "1",
    //     title:'首页'
    //   } 
    // },
    // {
    //   path: '/Home',
    //   component: Home,
    //   meta: {
    //     // theIndex: "1",
    //     title:'首页'
    //   } 
    // },
    
    //  {
    //   path: '*',
    //   component: Home,
    //   redirect:'/Home',
    //   meta: {
    //     // theIndex: "1",
    //     title:'首页'
    //   } 
    // }
    {
      path:'/',
      component:Employee,
      meta:{
        title:''
      }
    },
    {
      path: '/Employee',
      component: Employee,
      meta: {
        // theEmployee: "1",
        title:'首页'
      } 
    },
    
     {
      path: '*',
      component: Employee,
      redirect:'/Employee',
      meta: {
        // theIndex: "1",
        title:'首页'
      } 
    }
  ]
})
