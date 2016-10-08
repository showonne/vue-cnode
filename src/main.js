import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

require('./assets/less/global.less')

Vue.use(VueResource)
Vue.use(VueRouter)

import filters from './filters.js'

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

const routes = [
        {path: '/', component: resolve => require(['./components/Welcom.vue'], resolve)},
        {path: '/topic', component: resolve => require(['./components/Topic.vue'], resolve)},
        {path: '/detail/:id', component: resolve => require(['./components/Detail.vue'], resolve)},
        {path: '/about', component: resolve => require(['./components/About.vue'], resolve)},
        {path: '/login', component: resolve => require(['./components/Login.vue'], resolve)},
        {path: '/user/:loginname', component: resolve => require(['./components/User.vue'], resolve)},
        {path: '/message', component: resolve => require(['./components/Message.vue'], resolve)}
    ]

const router = new VueRouter({
    routes
})

import App from './components/App.vue'

const app = new Vue({
  router
}).$mount('#app')
