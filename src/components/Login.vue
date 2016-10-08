<template>
    <div class="form">
        <mt-field label="通过tocken登录" placeholder="Access Token" :value="tocken"></mt-field>
        <mt-button type="primary" @click="login">登录</mt-button>
        <router-link to="{name: 'topic'}">
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
        props: [{
            name: 'tocken',
            default: ''
        }],
        methods: {
            login() {
                this.$http.post('/api/accesstoken', {
                    accesstoken: this.tocken
                })
                .then((res) => {
                    let resJson = res.json()
                    localStorage.loginname = resJson.loginname
                    localStorage.avatar_url = resJson.avatar_url
                    localStorage.accesstoken = this.tocken
                    localStorage.id = resJson.id
                    let backUrl = this.$route.query.backUrl
                    if(/user/.test(backUrl)){
                        this.$route.router.go({name: 'user', params: {loginname: localStorage.loginname}})
                    }else{
                        this.$route.router.go({name: backUrl})
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
