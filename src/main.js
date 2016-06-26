import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
var VueResource = require('vue-resource')

/* eslint-disable no-new */

Vue.use(MintUI)
Vue.use(VueResource)

new Vue({
  el: 'body',
  components: { App }
})
