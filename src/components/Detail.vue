<template>
    <div class="root">
        <mt-header>
            <mt-button @click.native="back" icon="back" slot="left">返回</mt-button>
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
            <div v-html="content.content"></div>
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
                                <a :class="['up', {uped: uped(reply.ups)}]" @click="up(reply)">{{reply.ups.length}} 赞</a>
                                <a class="reply" @click="replyTo(reply.id, reply.author.loginname)">回复</a>
                            </div>
                        </div>
                    </div>
                    <div v-html="reply.content"></div>
                    <div class="reply-box" v-if="reply.id === currentId">
                        <textarea v-model="replyToMsg"></textarea>
                        <button type="button" @click="addReplyTo(reply.id, reply.author.loginname)">回复</button>
                    </div>
                </li>
            </ul>
            <div class="reply-box" v-if="isLogin">
                <textarea v-model="replyMsg"></textarea>
                <button type="button" @click="reply">回复</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Header, Indicator, MessageBox, Toast, Button } from 'mint-ui'
    import { bus } from '../eventBus.js'
    export default {
        components: {
            'mt-header': Header,
            'mt-button': Button
        },
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
                },
                replyMsg: '',
                replyToMsg: '',
                currentId: '',
                bus: bus
            }
        },
        computed: {
            'isLogin': function(){
                return localStorage.id === undefined ? false : true
            }
        },
        methods: {
            replyTo(toId, toName) {
                if(localStorage.id){
                    this.currentId = toId
                    this.replyToMsg = `@${toName} `
                }else{
                    this.$router.push({name: 'login'})
                }

            },
            addReplyTo(toId, toName){
                this.currentId = toId
                let topic_id = this.$route.params.id
                let accesstoken = localStorage.accesstoken
                let reply_id = toId
                this.$http.post(`/api/topic/${topic_id}/replies`, {
                    accesstoken: accesstoken,
                    content: this.replyToMsg,
                    reply_id: toId
                })
                .then((res) => {
                    Toast('回复成功~')
                    this.content.replies.push({
                        author: {
                            avatar_url: localStorage.avatar_url,
                            loginname: localStorage.loginname
                        },
                        ups: [],
                        reply_id: toId,
                        content: this.replyToMsg,
                        id: res.json().reply_id,
                        create_at: new Date()
                    })
                })
            },
            reply() {
                let topic_id = this.$route.params.id
                let content = this.replyMsg
                let accesstoken = localStorage.accesstoken
                this.$http.post(`/api/topic/${topic_id}/replies`, {
                    accesstoken: accesstoken,
                    content: content
                })
                .then((res) => {
                    Toast('回复成功~')
                    this.content.replies.push({
                        author: {
                            avatar_url: localStorage.avatar_url,
                            loginname: localStorage.loginname
                        },
                        ups: [],
                        reply_id: null,
                        content: content,
                        id: localStorage.id,
                        create_at: new Date()
                    })
                    this.replyMsg = ''
                })
            },
            back() {
                window.history.back()
            },
            up(reply) {
                if(localStorage.id){
                    if(reply.ups.findIndex((v) => { return v === localStorage.id}) === -1){
                        Indicator.open('执行中...')
                        this.$http.post(`api/reply/${reply.id}/ups`, {
                            accesstoken: localStorage.accesstoken,
                            action: 'up'
                        })
                        .then((res) => {
                            reply.ups.push(localStorage.id)
                            Indicator.close()
                        }, (err) => {
                            MessageBox.alert(err.json().error_msg, '操作失败')
                            Indicator.close()
                        })
                    }else{
                        Indicator.open('执行中...')
                        this.$http.post(`api/reply/${reply.id}/ups`, {
                            accesstoken: localStorage.accesstoken,
                            action: 'down'
                        })
                        .then((res) => {
                            let index = reply.ups.findIndex((v) => {return v === localStorage.id})
                            reply.ups.splice(index, 1)
                            Indicator.close()
                        })
                    }
                }else{
                    this.$routor.push({name: 'login'})
                }
            },
            uped(ups) {
                if(localStorage.id){
                    if(ups.findIndex((v) => { return v === localStorage.id }) === -1){
                        return false
                    }else{
                        return true
                    }
                }
            }
        },
        mounted() {
            Indicator.open({
              text: 'Loading...',
              spinnerType: 'fading-circle'
            })
            // bus.$emit('chChannel', 'topic')
            this.$http.get(`/api/topic/${this.$route.params.id}`)
                .then((res) => {
                    this.content = res.json().data
                    Indicator.close()
                })
        }
    }
</script>

<style lang='less'>
    .root{
        padding-bottom: 40px;
    }
    .body{
        padding: 10px 10px;
        padding-bottom: 20px;
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
                background: #d13434;
                padding: 2px 5px;
            }
            .uped{
                background: #41B883;
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
    .reply-box{
        border: 1px solid rgb(124, 197, 190);
        margin-top: 10px;
        padding: 4px;
        textarea{
            width: 100%;
            height: 60px;
            outline: none;
            border: none;
        }
        button{
            outline: none;
            height: 40px;
            width: 100%;
            border: none;
            background: rgb(124, 197, 190);
            color: #fff;
        }
    }
</style>
