<template>
    <mt-header>
        <mt-button @click="back" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="body">
        <h1 class="title">{{content.title}}</h1>
        <div class="summary">
            <div class="author">
                <img :src="content.author.avatar_url" />
                <span>{{content.author.loginname}}</span>
            </div>
            <div class="changes">
                <span>{{content.create_at | date}}发布</span>
                <span>|</span>
                <span>{{content.visit_count}}人浏览过</span>
            </div>
        </div>
        {{{content.content}}}
        <hr>
        <ul class="reply-list">
            <li v-for="reply in content.replies">
                <div class="reply-info">
                    <div>
                        <img :src="reply.author.avatar_url" />
                        <span class="loginname">{{reply.author.loginname}}</span>
                    </div>
                    <div class="changes">
                        <span class="create_at">{{reply.create_at | date}}</span>
                        <div class="operation">
                            <a class="up">{{reply.ups.length}} 赞</a>
                            <a class="reply">回复</a>
                        </div>
                    </div>
                </div>
                {{{reply.content}}}
            </li>
        </ul>
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
                    },
                    replies: [{
                        author: {
                            avatar_url: '',
                            loginname: ''
                        },
                        ups: []
                    }]
                }
            }
        },
        methods: {
            back() {
                window.history.back()
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
            font-size: 18px;
            font-weight: 800;
            img{
                height: 40px;
                width: 40px;
            }
        }
        .changes{
            font-size: 12px;
        }
    }
    .markdown-text{
        word-wrap: break-word;
        img{
            max-width: 100%;
            margin: 5px 0;
        }
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
    .reply-list{
        padding-top: 20px;
        .loginname{
            font-size: 18px;
            font-weight: 800;
            vertical-align: top;
        }
        .changes{
            font-size: 14px;
            color: #fff;
            .up{
                background: #30dd92;
                padding: 2px 5px;
            }
            .create_at{
                color: #777;
            }
            .reply{
                background: #b26ad8;
                padding: 2px 5px;
            }
            .operation{
                display: flex;
                margin-top: 4px;
            }
        }
        li{
            display: flex;
            flex-flow: column;
            padding-top: 10px;
            border-bottom: 1px solid #ccc;
            .reply-info{
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            img{
                height: 40px;
                width: 40px;
            }
        }
    }
</style>
