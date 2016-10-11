import Vue from 'vue'
import VueRouter from 'vue-router'

// require('./assets/less/global.less')

const inBrowser = typeof window !== 'undefined'

Vue.use(VueRouter)
inBrowser && Vue.use(require('vue-resource'))

import filters from './filters.js'

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

import Welcom from './components/Welcom.vue'
import Topic from './components/Topic.vue'
import Detail from './components/Detail.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'
import User from './components/User.vue'
import Message from './components/Message.vue'

const components = {
    Welcom,
    Topic,
    Detail,
    About,
    Login,
    User,
    Message
}

const fetchComponent = (name) => {
    console.info('fetching component: ', name)
    return {
        name: name,
        render(h){
            return h(components[name])
        }
    }
}

const routes = [
        {name: 'welcom', path: '/', component: fetchComponent('Welcom')},
        {name: 'topic', path: '/topic', component: fetchComponent('Topic')},
        {name: 'detail', path: '/detail/:id', component: fetchComponent('Detail')},
        {name: 'about', path: '/about', component: fetchComponent('About')},
        {name: 'login', path: '/login', component: fetchComponent('Login')},
        {name: 'user', path: '/user/:loginname', component: fetchComponent('User')},
        {name: 'message', path: '/message', component: fetchComponent('Message')}
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

import App from './components/App.vue'

const app = new Vue({
  router,
  ...App
})

export { app, router }

