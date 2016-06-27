<template>
    <mt-header>
        <mt-button v-link="{name: 'topic'}" icon="back" slot="left">返回</mt-button>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="body">
        <h1 class="title">{{content.title}}</h1>
        <div class="summary">
            <div class="author">
                <img :src="content.author.avatar_url" />
                <span>{{content.author.loginname}}</span>
            </div>
            <div class="changes">
                <span>{{content.create_at | date}}</span>
                <span>{{content.visit_count}}人浏览过</span>
            </div>
        </div>
        <div class="markdown-container">{{{content.content}}}</div>
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

<style lang='less'>
    .body{
        padding: 10px 10px;
    }
    .title{
        color: #2c3e50;
    }
    .summary{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 10px 0;
        .author{
            font-size: 16px;
            img{
                height: 40px;
                width: 40px;
            }
        }
        .changes{
            font-size: 12px;
        }
    }
    .markdown-container{
        word-wrap: break-word;
        pre{
            overflow: auto;
            &.prettyprint{
                background: #eee;
                padding: 10px;
            }
        }
        h1{
            border-bottom: 1px solid #ddd;
            padding-bottom: 4px;
            margin: 1em 0;
        }
        h2{
            margin: 1em 0;
            border-bottom: 1px solid #ddd;
            padding-bottom: 4px;
        }
        p{
            line-height: 1.2;
            margin: 1em 0;
        }
        ul{
            list-style: circle;
            padding-left: 20px;
            margin: 4px 0;
            li{
                margin: 2px 0;
            }
        }
        ol{
            list-style: circle;
            padding-left: 20px;
            margin: 4px 0;
            li{
                margin: 2px 0;
            }
        }
        table{
            margin: 10px 0;
            border-collapse: collapse;
            td, th{
                padding: 2px 4px;
                border: 1px solid #ccc;
            }
        }
        blockquote{
            border-left: 4px solid #ccc;
            padding: 4px 0 4px 15px;
            background: #eee;
            p{
                margin: 0;
                color: #333;
            }
        }
    }
</style>
