'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _08ac2d4f = process.BROWSER_BUILD ? () => System.import('/Users/showonne/Desktop/vue-cnode/pages/Welcome.vue') : require('/Users/showonne/Desktop/vue-cnode/pages/Welcome.vue')

const _4e5148ae = process.BROWSER_BUILD ? () => System.import('/Users/showonne/Desktop/vue-cnode/pages/User.vue') : require('/Users/showonne/Desktop/vue-cnode/pages/User.vue')

const _fd3c7c48 = process.BROWSER_BUILD ? () => System.import('/Users/showonne/Desktop/vue-cnode/pages/Topic.vue') : require('/Users/showonne/Desktop/vue-cnode/pages/Topic.vue')

const _564a9118 = process.BROWSER_BUILD ? () => System.import('/Users/showonne/Desktop/vue-cnode/pages/Message.vue') : require('/Users/showonne/Desktop/vue-cnode/pages/Message.vue')

const _03c13716 = process.BROWSER_BUILD ? () => System.import('/Users/showonne/Desktop/vue-cnode/pages/Login.vue') : require('/Users/showonne/Desktop/vue-cnode/pages/Login.vue')

const _bd280918 = process.BROWSER_BUILD ? () => System.import('/Users/showonne/Desktop/vue-cnode/pages/Detail.vue') : require('/Users/showonne/Desktop/vue-cnode/pages/Detail.vue')

const _fddbf1e4 = process.BROWSER_BUILD ? () => System.import('/Users/showonne/Desktop/vue-cnode/pages/App.vue') : require('/Users/showonne/Desktop/vue-cnode/pages/App.vue')

const _1a61b93a = process.BROWSER_BUILD ? () => System.import('/Users/showonne/Desktop/vue-cnode/pages/About.vue') : require('/Users/showonne/Desktop/vue-cnode/pages/About.vue')


const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}

export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  scrollBehavior,
  routes: [
		{
			path: "/Welcome",
			component: _08ac2d4f,
			name: "Welcome"
		},
		{
			path: "/User",
			component: _4e5148ae,
			name: "User"
		},
		{
			path: "/Topic",
			component: _fd3c7c48,
			name: "Topic"
		},
		{
			path: "/Message",
			component: _564a9118,
			name: "Message"
		},
		{
			path: "/Login",
			component: _03c13716,
			name: "Login"
		},
		{
			path: "/Detail",
			component: _bd280918,
			name: "Detail"
		},
		{
			path: "/App",
			component: _fddbf1e4,
			name: "App"
		},
		{
			path: "/About",
			component: _1a61b93a,
			name: "About"
		}
  ]
})
