import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import store from './store'

require('./assets/less/global.less')

Vue.use(VueResource)
Vue.use(VueRouter)

import filters from './filters.js'

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

const getComponent = name => {
    return resolve => require([`./components/${name}.vue`], resolve)
}

const routes = [
        {name: 'welcom', path: '/', component: getComponent('Welcome')},
        {name: 'topic', path: '/topic', component: getComponent('Topic')},
        {name: 'detail', path: '/detail/:id', component: getComponent('Detail')},
        {name: 'about', path: '/about', component: getComponent('About')},
        {name: 'login', path: '/login', component: getComponent('Login')},
        {name: 'user', path: '/user/:loginname', component: getComponent('User'), meta: {auth: true}},
        {name: 'message', path: '/message', component: getComponent('Message'), meta: {auth: true}}
    ]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.auth){
        if(localStorage.id){
            next()
        }else{
            let backUrl = encodeURIComponent(to.path)
            console.info('cb: ', backUrl)
            router.push(`/login?backUrl=${backUrl}`)
        }
    }else{
        next()
    }
})

const App = require('./components/App.vue')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

