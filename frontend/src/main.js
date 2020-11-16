import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import { ImagePlugin } from 'bootstrap-vue'
// import { VueEditor } from "vue2-editor"; /* Paquete para formatear código */

// Vue.use(ImagePlugin)

//style Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//style Bootstrap

Vue.use(BootstrapVue,ImagePlugin);
Vue.use(VueAxios, axios)
// Vue.use(VueEditor)


// Agregamos la URL base de nuestra API
 axios.defaults.baseURL = 'https://programmer-tutorial.herokuapp.com';
// axios.defaults.baseURL = 'http://localhost:3000';

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
