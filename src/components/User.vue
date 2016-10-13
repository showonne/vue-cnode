<template>
    <div class="container">
        <div class="card">
            <div class="card-item">
                <img class="avatar-photo" :src="userInfo.avatar_url"  />
                <span class="loginname" v-text="userInfo.loginname"></span>
                <span class="create_at">{{userInfo.create_at | date}} created.</span>
            </div>
            <div class="card-item card-button">
                <span class="score">积分:<b v-text="userInfo.score"></b></span>
                <span class="github"><img class="icon-github" src="../assets/github.png" /><a target="blank" :href="'https://www.github.com/' + userInfo.githubUsername">{{userInfo.githubUsername}}</a></span>
            </div>
        </div>
        <ul class="tab">
            <li @click="chTab('reply')" :class="{selected: cTab === 'reply'}">最近回复</li>
            <li @click="chTab('topic')" :class="{selected: cTab === 'topic'}">最近发表</li>
        </ul>
        <ul class="tab-list">
            <li v-for="item in dataSet">
                <div class="list-item">
                    <router-link tag="div" :to="{name:'user', params:{loginname: item.author.loginname}}" class="item-left">
                        <img :src="item.author.avatar_url" />
                        <span v-text="item.author.loginname"></span>
                    </router-link>
                    <router-link tag="div" :to="{name: 'detail', params:{id: item.id}}" class="item-right">
                        <h4 v-text="item.title"></h4>
                        <span v-text="item.last_reply_at"></span>
                    </router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { bus } from '../main.js'
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
                },
                'cTab': 'reply',
                'dataSet': [],
                bus: bus
            }
        },
        methods: {
            chTab(selected) {
                if(selected === 'reply'){
                    this.dataSet = this.userInfo.recent_replies
                }else{
                    this.dataSet = this.userInfo.recent_topics
                }
                this.cTab = selected
            }
        },
        watch: {
            '$route': function(val) {
                let loginname = val.params.loginname
                this.$http.get(`/api/user/${loginname}`)
                    .then((res) => {
                        this.userInfo = res.json().data
                        this.chTab('reply')
                    })
            }
        },
        mounted() {
            bus.$emit('chChannel', 'user')
            let loginname = this.$route.params.loginname
            this.$http.get(`/api/user/${loginname}`)
                .then((res) => {
                    this.userInfo = res.json().data
                    this.chTab('reply')
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
        .card-item{
            display: flex;
            align-items: flex-end;
            &:first-child{
                padding: 6px;
                box-shadow: 0px 1px 5px #aaa;
                margin: 10px 2px 4px;
            }
        }
        .card-button{
            height: 40px;
            box-shadow: 0 1px 5px #aaa;
            margin: 2px;
            font-size: 18px;
            align-items: center;
            justify-content: space-around;
        }
    }
    .score{
        flex: 1;
        text-align: center;
    }
    .github{
        flex: 1;
        display: flex;
        align-items: center;
        a{
            flex: 4;
            padding-left: 10px;
        }
    }
    .icon-github{
        flex: 1;
        height: 32px;
        width: 32px;
    }
    .avatar-photo{
        height: 75px;
        width: 75px;
        border-radius: 50%;
    }
    .loginname{
        font-size: 24px;
        font-weight: 800;
        font-family: 'Microsoft YaHei';
        flex: 2;
        text-align: center;
    }
    .create_at{
        flex: 1;
        text-align: center;
        color: #5A5EBC;
    }
    .tab{
        height: 40px;
        display: flex;
        list-style: none;
        margin: 4px 2px 0;
        li{
            flex: 1;
            text-align: center;
            padding-top: 10px;
            font-size: 18px;
            font-weight: 800;
            &:first-child{
                border-right: 1px solid #ccc;
            }
            &.selected{
                background: #26a2ff;
                color: #fff;
                border-bottom: 1px solid #26a2ff;
            }
        }
    }
    .tab-list{
        border-top: 1px solid #ccc;
    }
    .list-item{
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
        box-sizing: border-box;
        padding: 2px;
        img{
            height: 40px;
            width: 40px;
            margin: 0 auto;
        }
        span{
            margin-top: 4px;
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
