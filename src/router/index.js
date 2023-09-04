import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import store from '@/store'
import storage from '@/model/storage'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    
    component: Login
  },{
    path: '/Register',
    name: 'Register',
    component: Register
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'about',
    meta:{
      requireAuth:true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    children:[
      {
        path:'/User',
        name:'User',
        meta:{
          title:'个人中心'
        },
        component: () => import('@/components/User/User.vue')
      },
      {
        path:'/admin',
        name:'admin',
        meta:{
          title:'管理员管理'
        },
        component: () => import('@/components/AdminManage/AdminManage.vue')
      },
      {
        path:'/index',
        name:'index',
        meta:{
          title:'首页'
        },
        component: () => import('@/components/Index/Index.vue')
      },
      {
        path:'/textDemo',
        name:'textDemo',
        meta:{
          title:'测试'
        },
        component: () => import('@/components/TextDemo/TextDemo.vue')
      },
      {
        path:'/chatRoom',
        name:'chatRoom',
        meta:{
          title:'聊天室'
        },
        component: () => import('@/components/chatRoom/chatRoom.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/haha',
        name: 'haha',
        component: () => import('@/components/HaDemo/HaDemo.vue')
      },
    ]

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 设置路由守卫，在进页面之前，判断有token，才进入页面，否则返回登录页面
if (storage.get("token")) {
  store.commit("setToken", storage.get("token"));
}
router.beforeEach((to, from, next) => {
  // 判断要去的路由有没有requiresAuth
  // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next(); //有token,进行request请求，后台还会验证token
    } else {
      next({
        path: "/",
        // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
        query: { redirect: to.fullPath }  
      });
    }
  } else {
    next(); //如果无需token,那么随它去吧
  }
});

export default router
