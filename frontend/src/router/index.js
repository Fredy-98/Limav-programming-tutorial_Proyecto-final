import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import List from '../views/List.vue'
import tutorialVideo from '../views/tutorialVideo.vue'
import Login from '../components/Login.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requireAuth: true}
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
    component: User,
    meta: {requireAuth: true} 
  },
  {
    path:'/list',
    name:'List',
    component: List,
    meta: {requireAuth: true}
  },
  {
    path:'/tutorial',
    name:'tutorialVideo',
    component: tutorialVideo,
    meta: {requireAuth: true}
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

router.beforeEach((to,from,next) =>{
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth)
  if(rutaProtegida && store.state.token === ''){
    next({name:'Login'})
  }else{
    next();
  }
});
export default router
