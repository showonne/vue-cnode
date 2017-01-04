import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        channel: location.pathname.split('/')[1]
    },
    mutations: {
        chChannel(state, channel){
            state.channel = channel
        }
    }
})

export default store