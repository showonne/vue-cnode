<template>
    <div class="form">
        <mt-field label="通过tocken登录" placeholder="Access Token" v-model="token"></mt-field>
        <mt-button type="primary" @click.native="login">登录</mt-button>
        <router-link :to="{name: 'topic'}">
            <mt-button type="default">回去逛逛</mt-button>
        </router-link>
    </div>
</template>

<script>
    import { Field, Button } from 'mint-ui'
    export default {
        components: {
            'mt-field': Field,
            'mt-button': Button
        },
        data() {
            return {
                token: ''
            }
        },
        methods: {
            login() {
                this.$http.post('/api/accesstoken', {
                    accesstoken: this.token
                })
                .then((res) => {
                    let resJson = res.json()
                    localStorage.loginname = resJson.loginname
                    localStorage.avatar_url = resJson.avatar_url
                    localStorage.accesstoken = this.token
                    localStorage.id = resJson.id
                    let backUrl = this.$route.query.backUrl
                    if(/user/.test(backUrl)){
                        this.$router.push({name: 'user', params: {loginname: localStorage.loginname}})
                    }else{
                        this.$router.push({name: backUrl})
                    }
                })
            }
        }
    }
</script>

<style lang='less'>
    .form{
        height: 50%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        &>div{
            width: 100%;
        }
    }
    button{
        width: 84%;
        margin-top: 20px;
    }
</style>
