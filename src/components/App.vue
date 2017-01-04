<template>
    <div id="app">
        <router-view></router-view>
        <div class="fix-bottom" v-if="!isWelcom">
            <mt-tabbar v-model="channel">
                <mt-tab-item id="topic">
                    <img src="../assets/topic.png" slot="icon">
                    话题
                </mt-tab-item>
                <mt-tab-item id="message">
                    <img src="../assets/message.png" slot="icon">
                    消息
                </mt-tab-item>
                <mt-tab-item id="user">
                    <img src="../assets/my.png" slot="icon">
                    我的
                </mt-tab-item>
                <mt-tab-item id="about">
                    <img src="../assets/about.png" slot="icon">
                    关于
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
    import { TabItem, Tabbar } from 'mint-ui'
    export default {
        name: 'App',
        components: {
            'mt-tab-item': TabItem,
            'mt-tabbar': Tabbar
        },
        data() {
            return {
                channel: this.$store.state.channel
            }
        },
        computed: {
            isWelcom() {
                return this.$route.path === '/' || this.$route.path === '/login'
            }
        },
        watch: {
            channel (val) {
                if(val === 'user'){
                    if(localStorage.loginname){
                        this.$router.push({
                            name: 'user',
                            params: {
                                loginname: localStorage.loginname
                            }
                        })
                        this.$store.commit('chChannel', 'user')
                    }else{
                        this.$router.push({name: 'login', query: {backUrl: encodeURIComponent('/user')}})
                    }
                }else{
                    this.$router.push({
                        name: this.channel
                    })
                    this.$store.commit('chChannel', val)
                }
            }
        }
    }
</script>

<style>
    .fix-bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
