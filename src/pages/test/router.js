 
import Vue from 'vue'
import Router from 'vue-router'
import text from "./page/text.vue"
import User from "./page/User.vue"
Vue.use(Router)

export default new Router({
    // mode: 'history',  //去掉url中的#
    routes:[
        { path: '/', component: text },
        { path: '/User', component: User }
    ]
  })