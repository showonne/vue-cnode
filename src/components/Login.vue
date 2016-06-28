<template>
    <div class="form">
        <mt-field label="通过tocken登录" placeholder="Access Token" :value.sync="tocken"></mt-field>
        <mt-button type="primary" @click="login">登录</mt-button>
    </div>
</template>

<script>
    import { Field, Button } from 'mint-ui'
    export default {
        components: { Field, Button },
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
                    localStorage.id = resJson.id
                    let backUrl = decodeURIComponent(this.$route.query.backUrl)
                    this.$route.router.go(backUrl)
                })
                console.log(this.tocken)
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
