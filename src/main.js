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
        {name: 'welcom', path: '/', component: resolve => require(['./components/Welcom.vue'], resolve)},
        {name: 'topic', path: '/topic', component: resolve => require(['./components/Topic.vue'], resolve)},
        {name: 'detail', path: '/detail/:id', component: resolve => require(['./components/Detail.vue'], resolve)},
        {name: 'about', path: '/about', component: resolve => require(['./components/About.vue'], resolve)},
        {name: 'login', path: '/login', component: resolve => require(['./components/Login.vue'], resolve)},
        {name: 'user', path: '/user/:loginname', component: resolve => require(['./components/User.vue'], resolve)},
        {name: 'message', path: '/message', component: resolve => require(['./components/Message.vue'], resolve)}
    ]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.name === 'user' || to.name === 'message'){
        if(localStorage.id){
            next()
        }else{
            let backUrl = encodeURIComponent(to.path)
            router.push(`/login?backUrl=${backUrl}`)
        }
    }else{
        next()
    }
})

var App = require('./components/App.vue')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
