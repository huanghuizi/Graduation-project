import Vue from 'vue'
import VueRouter from 'vue-router'
import _service from '@/service'
import layout from '@/views/layout.vue';


Vue.use(VueRouter)


// const Login=()=>import('../views/Login.vue')
const routes = [
  {
    path: '/',
    name: 'Login',
    component: ()=>import(/* webpackChunkName: "Login" */'../views/Login.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: ()=>import(/* webpackChunkName: "Login" */'../views/Login.vue')
  },
  {
    path: '/Register/:Id',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/machineMangement',
    name: 'machineMangement',
    component: () => import(/* webpackChunkName: "Index" */ '../views/layout.vue'),
    children:[
      {
        path: '/',
        name: 'machineMangement',
        component: () => import(/* webpackChunkName: "IndexNews" */ '../views/machineMangement/Index.vue'),
      },
      {
        path: '/userManagement',
        name: 'userManagement',
        component: () => import(/* webpackChunkName: "IndexNews" */ '../views/userManagement/Index.vue'),
      },
      {
        path: '/machineUseDetail',
        name: 'machineUseDetail',
        component: () => import(/* webpackChunkName: "IndexNews" */ '../views/machineUseDetail/Index.vue'),
      },
      {
        path: '/machineRecord',
        name: 'machineRecord',
        component: () => import(/* webpackChunkName: "IndexNews" */ '../views/machineRecord/index.vue'),
      },
      {
        path: '/changePassword',
        name: 'changePassword',
        component: () => import(/* webpackChunkName: "IndexNews" */ '../views/changePassword/index.vue'),
      },
      {
        path: '/toDoLists',
        name: 'toDoLists',
        component: () => import(/* webpackChunkName: "IndexNews" */ '../views/toDoLists/index.vue'),
      },
      {
        path: '/informationAnalysis',
        name: 'informationAnalysis',
        component: () => import(/* webpackChunkName: "IndexNews" */ '../views/informationAnalysis/Index.vue'),
      },
      {
        path: '/formApplication',
        name: 'formApplication',
        component: () => import(/* webpackChunkName: "IndexNews" */ '../views/formApplication/index.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass:'active',
  routes
})

export default router
