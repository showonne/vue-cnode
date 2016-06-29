<template>
    <div class="container">
        <div class="card">
            <div class="card-item">
                <img class="avatar-photo" :src="userInfo.avatar_url"  />
                <span class="loginname" v-text="userInfo.loginname"></span>
                <span class="create_at" v-text="userInfo.create_at | date"></span>
            </div>
            <div class="card-item card-button">
                <span>积分:<b v-text="userInfo.score"></b></span>
                <span>GitHub: <a>{{userInfo.githubUsername}}</a></span>
            </div>
        </div>
        <ul class="tab">
            <li @click="chTab('reply')" :class="{selected: cTab === 'reply'}">最近回复</li>
            <li @click="chTab('topic')" :class="{selected: cTab === 'topic'}">最近发表</li>
        </ul>
        <ul class="tab-list">
            <li v-for="item in dataSet">
                <div class="list-item">
                    <div class="item-left" v-link="{name:'user', params:{loginname: item.author.loginname}}">
                        <img :src="item.author.avatar_url" />
                        <span v-text="item.author.loginname"></span>
                    </div>
                    <div class="item-right" v-link="{name: 'detail', params:{id: item.id}}">
                        <h4 v-text="item.title"></h4>
                        <span v-text="item.last_reply_at | date"></span>
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
                },
                'cTab': 'reply',
                'dataSet': []
            }
        },
        methods: {
            chTab(selected) {
                console.log(selected)
                if(selected === 'reply'){
                    this.dataSet = this.userInfo.recent_replies
                }else{
                    this.dataSet = this.userInfo.recent_topics
                }
                this.cTab = selected
            }
        },
        route: {
            data(transition) {
                let loginname = transition.to.params.loginname
                this.$http.get(`/api/user/${loginname}`)
                    .then((res) => {
                        this.userInfo = res.json().data
                        this.chTab('reply')
                    })
            }
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
