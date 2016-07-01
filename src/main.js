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

const router = new VueRouter()

router.map({
    '/': {
        name: 'welcom',
        component: (resolve) => {
            require(['./components/Welcom.vue'], resolve)
        }
    },
    '/topic': {
        name: 'topic',
        component: (resolve) => {
            require(['./components/Topic.vue'], resolve)
        }
    },
    '/detail/:id': {
        name: 'detail',
        component: (resolve) => {
            require(['./components/Detail.vue'], resolve)
        }
    },
    '/about': {
        name: 'about',
        component: (resolve) => {
            require(['./components/About.vue'], resolve)
        }
    },
    '/login': {
        name: 'login',
        component: (resolve) => {
            require(['./components/Login.vue'], resolve)
        }
    },
    '/user/:loginname': {
        name: 'user',
        component: (resolve) => {
            require(['./components/User.vue'], resolve)
        },
        auth: true
    },
    '/message': {
        name: 'message',
        component: (resolve) => {
            require(['./components/Message.vue'], resolve)
        },
        auth: true
    }
})

router.beforeEach((transition) => {
    if(transition.to.auth){
        if(localStorage.id){
            transition.next()
        }else{
            let backUrl = encodeURIComponent(transition.to.path)
            transition.redirect(`/login?backUrl=${backUrl}`)
        }
    }else{
        transition.next()
    }
})

import App from './components/App.vue'

router.start(App, '#app')
