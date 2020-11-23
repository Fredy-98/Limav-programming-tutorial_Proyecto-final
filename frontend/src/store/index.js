import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userDb: '' 
  },
  mutations: {
    // El payload es el token
    getUser(state,payload){
      state.token = payload;
      if(payload === ''){
        state.userDb = ''
      }else{
        state.userDb = decode(payload);
        router.push({name:'Home'})
      }
    }
  },
  actions: {
    keepUser({commit},payload){
      localStorage.setItem('token',payload)
      commit('getUser',payload)
    },
    /* cerrarSesion */
    logOut({commit}){
      commit('getUser','');
      localStorage.removeItem('token'); 
      router.push({name:'Login'});     
    },
    readToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('getUser',token)
      }else{
        commit('getUser','');
      }
    }
  },
  getters:{
    estaActivo: state => !!state.token
  },
  modules: {
  }
})
