import Vue from 'vue'
import Router from 'vue-router'

const Index =()=> import('@/vuepage/page/Index.vue')
const IndexNew =()=> import('@/vuepage/page/IndexNew.vue')
Vue.use(Router)


export default new Router({
  routes: [
    {
      path:'/',
      component:Index,
      meta:{
        theIndex: "1",
        title:'随机生成'
      }
    },
    {
      path: '/Index',
      component: Index,
      meta: {
        theIndex: "1",
        title:'随机生成',
      }
    },

    {
      path: '/IndexNew',
      component: IndexNew,
      meta: {
        theIndex: "1",
        title:'随机生成',
      }
    },
  
     {
      path: '*',
      component: Index,
      redirect:'/Index',
      meta: {
        theIndex: "1",
        title:'随机生成'
      }
    }
  ]
})
