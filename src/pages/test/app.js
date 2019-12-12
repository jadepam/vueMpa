import Vue from 'Vue'
import App from './app.vue'
import router from './router';
// import store from './store';
// import request from './utils/request';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios, request)
// Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  render: h => h(App)//运行时版本相比完整版体积要小大约 30%
})
