import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

require('./assets/less/global.less')

Vue.use(MintUI)
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
    'login': {
        name: 'login',
        component: (resolve) => {
            require(['./components/Login.vue'], resolve)
        }
    },
    'me': {
        name: 'me',
        component: (resolve) => {
            require(['./components/Me.vue'], resolve)
        },
        auth: true
    },
    'message': {
        name: 'message',
        component: (resolve) => {
            require(['./components/Message.vue'], resolve)
        },
        auth: true
    }
})

router.beforeEach((transition) => {
    if(transition.to.auth){
        console.log('need auth')
        if(localStorage.id){
            transition.next()
        }else{
            let backUrl = encodeURIComponent(transition.to.path)
            transition.redirect(`/login?backUrl=${backUrl}`)
        }
    }else{
        console.log('passed')
        transition.next()
    }
})

import App from './components/App.vue'

router.start(App, '#app')
