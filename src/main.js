import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import axios from 'axios';
import { store } from './store/store'
import VueSocketIO from 'vue-socket.io'

// this is the same instance that is used in other places 
axios.defaults.baseURL = 'http://localhost:3000/'
// although you could create new instances that is used 
// only in some places

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.use(VueRouter)

Vue.use(new VueSocketIO({
  debug: true,
  connection: axios.defaults.baseURL,
  vuex: {
    store
  }
}))

const router = new VueRouter({ routes: routes, mode: 'history' })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
