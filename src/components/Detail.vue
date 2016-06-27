<template>
    <mt-header>
        <mt-button v-link="{name: 'topic'}" icon="back" slot="left">返回</mt-button>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="body">
        <h1 class="title">{{content.title}}</h1>
        <div class="">
            <img :src="content.author.avatar_url" />
            <span>{{content.author.loginname}}</span>
            <span>{{content.create_at | date}}</span>
            <span>{{content.visit_count}}</span>
        </div>
        <div>{{{content.content}}}</div>
    </div>
</template>

<script>
    import { Header, Indicator } from 'mint-ui'
    export default {
        components: [ Header ],
        data() {
            return {
                content: {
                    author: {
                        loginname: '',
                        avatar_url: ''
                    }
                }
            }
        },
        ready() {
            Indicator.open({
              text: 'Loading...',
              spinnerType: 'fading-circle'
            })
            this.$http.get(`/api/topic/${this.$route.params.id}`)
                .then((res) => {
                    this.content = res.json().data
                    Indicator.close()
                })
        },
        filters: {
            date(input){
                let now = Date.now(), date = new Date(String(input)).getTime(), delta = parseInt((now - date) / 1000)
                switch (true) {
                    case (delta < 60):
                        return '刚刚'
                    case (delta >= 60 && delta < 60 * 60):
                        return `${parseInt(delta / 60)}分钟前`
                    case (delta >= 60 * 60 && delta < 60 * 60 * 24):
                        return `${parseInt(delta / (60 * 60))}小时前`
                    case (delta >= 60 * 60 * 24 && delta < 60 * 60 * 24 * 30):
                        return `${parseInt(delta / (60 * 60 * 24))}天前`
                    case (delta >= 60 * 60 * 24 * 30 && delta < 60 * 60 * 24 * 365):
                        return `${parseInt(delta / (60 * 60 * 24 * 30))}月前`
                    case (delta >= 60 * 60 * 24 * 365):
                        return `${parseInt(delta / (60 * 60 * 24 * 30 * 365))}月前`
                    default:
                        return '...'
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    .body{
        padding: 10px 10px;
    }
    .title{
        color: #2c3e50;
    }
</style>
