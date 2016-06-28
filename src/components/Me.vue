<template>
    <div class="container">
        <div class="card">
            <div class="card-item">
                <img class="avatar-photo" :src="userInfo.avatar_url"  />
                <span class="loginname" v-text="userInfo.loginname"></span>
                <span class="create_at" v-text="userInfo.create_at"></span>
            </div>
            <div class="card-item card-button">
                <span>积分:<b v-text="userInfo.score"></b></span>
                <span>GitHub: <a>{{userInfo.githubUsername}}</a></span>
            </div>
        </div>
        <ul class="tab">
            <li>最近回复</li>
            <li>最近发表</li>
        </ul>
        <ul class="tab-list">
            <li v-for='reply in userInfo.recent_replies'>
                <div class="reply-item">
                    <div class="item-left">
                        <img :src="reply.author.avatar_url" />
                        <span v-text="reply.author.loginname"></span>
                    </div>
                    <div class="item-right">
                        <h4 v-text="reply.title"></h4>
                        <span v-text="reply.last_reply_at"></span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Tabbar, TabItem } from 'mint-ui'
    export default {
        data() {
            return {
                userInfo: {
                    'loginname': '',
                    'avatar_url': '',
                    'create_at': '',
                    'githubUsername': '',
                    'recent_replies': [],
                    'recent_topics': [],
                    'score': ''
                }
            }
        },
        ready() {
            let loginname = localStorage.loginname
            this.$http.get(`/api/user/${loginname}`)
                .then((res) => {
                    this.userInfo = res.json().data
                    console.log(res.json().data)
                })
        }
    }
</script>

<style lang='less' scoped>
    .container{
        padding: 0 2px 0;
    }
    .card{
        display: flex;
        flex-flow: column;
        padding-top: 20px;
        .card-item{
            display: flex;
            align-items: flex-end;
        }
        .card-button{
            height: 40px;
            border: 1px solid #ccc;
            margin-top: 2px;
            font-size: 18px;
            align-items: center;
            justify-content: space-around;
        }
    }
    .avatar-photo{
        height: 75px;
        width: 75px;
    }
    .loginname{
        font-size: 24px;
        font-weight: 800;
        font-family: 'Microsoft YaHei';
    }
    .tab{
        height: 40px;
        display: flex;
        list-style: none;
        margin-top: 4px;
        li{
            flex: 1;
            text-align: center;
            padding-top: 10px;
            font-size: 18px;
            font-weight: 800;
            &:first-child{
                border-right: 1px solid #ccc;
            }
        }
    }
    .tab-list{
        border-top: 1px solid #ccc;
    }
    .reply-item{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }
    .item-left{
        flex: 2;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        img{
            height: 40px;
            width: 40px;
            margin: 0 auto;
        }
        span{
            text-align: center;
        }
    }
    .item-right{
        flex: 7;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
    }
</style>
