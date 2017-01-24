<template>
    <div>
        <mt-header title="个人中心" >
            <mt-button slot="right" @click.native="confirmLogout">退出登录</mt-button>
        </mt-header>
        <div class="container">
            <div class="card">
                <div class="card-item">
                    <img class="avatar-photo" :src="userInfo.avatar_url"  />
                    <span class="loginname" v-text="userInfo.loginname"></span>
                    <span class="create_at">注册于: {{userInfo.create_at | date}}</span>
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
    </div>
</template>

<script>
    import { Header, Button, MessageBox, Indicator, Toast } from 'mint-ui'

    export default {
        name: 'User',
        components: {
            'mt-header': Header,
            'mt-button': Button
        },
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
                'preUsername': ''
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
            },
            confirmLogout() {
                MessageBox.confirm('确认退出登录？')
                    .then((action) => {
                        Indicator.open('执行中...')
                        localStorage.accesstoken = ''
                        localStorage.avatar_url = ''
                        localStorage.id = ''
                        localStorage.loginname = ''
                        Indicator.close()

                        let toast = Toast({
                            message: '操作成功',
                            iconClass: 'icon icon-success'
                        })

                        setTimeout(() => {
                            toast.close()
                            this.$router.push({name: 'topic'})
                        }, 800)
                    })
                    .catch(() => {})
            }
        },
        watch: {
            '$route': function(val) {
                if(val.name !== 'user' || val.params.loginname === this.preUsername) return
                let loginname = val.params.loginname
                this.$http.get(`/api/user/${loginname}`)
                    .then((res) => {
                        this.userInfo = res.json().data
                        this.chTab('reply')
                        this.preUsername = loginname
                    })
            }
        },
        mounted() {
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

    }
    .card{
        display: flex;
        flex-flow: column;
        .card-item{
            display: flex;
            align-items: flex-end;
            &:first-child{
                padding: 6px 0;
                box-shadow: 0px 1px 5px #aaa;
                margin-bottom: 4px;
                padding-left: 10px;
                background:linear-gradient(#26a2ff, #fff);
            }
        }
        .card-button{
            height: 40px;
            box-shadow: 0 1px 5px #aaa;
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
        flex: 1;
        text-align: center;
    }
    .create_at{
        flex: 1;
        text-align: center;
        line-height: 1.5;
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
    .github a{
        text-decoration: none;
    }
    .item-right{
        flex: 7;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
    }
</style>
