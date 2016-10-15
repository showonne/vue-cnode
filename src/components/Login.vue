<template>
    <div>
        <mt-header title="用户登录"></mt-header>
        <div class="form">
            <mt-field label="通过tocken登录" placeholder="Access Token" v-model="token"></mt-field>
            <mt-button type="primary" @click.native="login">登录</mt-button>
            <router-link :to="{name: 'topic'}" class="back">
                <mt-button>回去逛逛</mt-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { Field, Button, Toast, Header } from 'mint-ui'
    export default {
        name: 'Login',
        components: {
            'mt-field': Field,
            'mt-button': Button,
            'mt-header': Header
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
                        this.$router.push(backUrl)
                    }
                })
                .catch((err) => {
                    Toast({
                        message: JSON.parse(err.data).error_msg,
                        duration: 800
                    })
                })
            }
        }
    }
</script>

<style lang='less' scoped>
    .back{
        display: block;
        width: 100%;
        margin-top: 20px;
        text-decoration: none;
        button{
            margin: 0 auto;
            display: block;
        }
    }
    .form{
        transform: translateY(100%);
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
