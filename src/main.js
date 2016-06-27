import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

require('./assets/less/global.less')

Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(VueRouter)

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
    }
})

const noValidationArr = ['/', '/topic', '/detail', '/about', '/login']

router.beforeEach((transition) => {
    if(noValidationArr.findIndex((v) => { return v === transition.to.path }) === -1){
        console.log('need auth')
        router.go('/login')
    }else{
        console.log('passed~')
        transition.next()
    }
})

import App from './components/App.vue'

router.start(App, '#app')
