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
        name: 'index',
        component: (resolve) => {
            require(['./components/Index.vue'], resolve)
        }
    },
    '/list': {
        name: 'list',
        component: (resolve) => {
            require(['./components/List.vue'], resolve)
        }
    }
})

const App = Vue.extend({})

router.start(App, '#app')
