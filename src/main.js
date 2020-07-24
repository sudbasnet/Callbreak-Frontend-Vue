import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import axios from 'axios';
import { store } from './store/store';

// this is the same instance that is used in other places 
axios.defaults.baseURL = 'http://localhost:3000/';
// although you could create new instances that is used 
// only in some places

Vue.config.productionTip = false;

Vue.use(VueResource);

Vue.use(VueRouter);

const router = new VueRouter({ routes: routes, mode: 'history' });

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app');
