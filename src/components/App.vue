<template>
    <div>
        <router-view></router-view>
        <div class="fix-bottom" v-if="!isWelcom">
            <mt-tabbar :selected.sync="channel">
                <mt-tab-item id="topic">
                    话题
                </mt-tab-item>
                <mt-tab-item id="message">
                    消息
                </mt-tab-item>
                <mt-tab-item id="user">
                    我的
                </mt-tab-item>
                <mt-tab-item id="about">
                    关于
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
    import { TabItem, Tabbar } from 'mint-ui'
    export default {
        components: {
            'mt-tab-item': TabItem,
            'mt-tabbar': Tabbar
        },
        computed: {
            isWelcom() {
                return this.$route.path === '/' || this.$route.path === '/login'
            }
        },
        data() {
            return {
                channel: this.$route.path.split('/')[1]
            }
        },
        watch: {
            'channel': function(val) {
                if(this.channel === 'user'){
                    this.$route.router.go({
                        name: 'user',
                        params: {
                            loginname: localStorage.loginname
                        }
                    })
                }else{
                    this.$route.router.go({
                        name: this.channel
                    })
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
