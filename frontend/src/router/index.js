import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import List from '../views/List.vue'
import tutorialVideo from '../views/tutorialVideo.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path:'/user', 
    name:'User', 
    component: User 
  },
  {
    path:'/list',
    name:'List',
    component: List
  },
  {
    path:'/tutorial',
    name:'tutorialVideo',
    component: tutorialVideo
  },
  /* <example params>*/
  /*{
    path:'/post/:id',
    name:'PostId',
    component: () => import('../views/PostId.vue')
  },*/
  /* </example params> */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router