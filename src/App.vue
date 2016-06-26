<template>
    <div id="body">
        <mt-navbar class="page-part" :selected.sync="selected">
            <mt-tab-item id="all">全部</mt-tab-item>
            <mt-tab-item id="good">精华</mt-tab-item>
            <mt-tab-item id="ask">问答</mt-tab-item>
            <mt-tab-item id="share">分享</mt-tab-item>
            <mt-tab-item id="job">招聘</mt-tab-item>
        </mt-navbar>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom">
            <ul>
                <li v-for="item in dataList" class="cell">
                    <h2 class="cell-title" :class="[{'top': item.top, 'good': item.good}, item.tab]" data-tab="{{item.top === true ? 'top' : item.good === true ? 'good' : item.tab | tab}}">{{item.title}}</h2>
                    <div class="summary">
                        <img :src="item.author.avatar_url" />
                        <div class="infobox">
                            <p>
                                <span class="authorname">{{item.author.loginname}}</span>
                                <span class="visitnum"><b>{{item.reply_count}}</b>/{{item.visit_count}}</span>
                            </p>
                            <p>
                                <span>{{item.create_at | date }}</span>
                                <span>{{item.last_reply_at | date }}</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    import { Loadmore, Navbar, TabItem } from 'mint-ui'
    export default {
        components: { Loadmore, Navbar, TabItem },
        data() {
            return {
                dataList: [],
                page: 1,
                pending: false
            }
        },
        methods: {
            loadTop(id) {
                console.log('load top called')
                if(!this.pending){
                    this.page = 1
                    this.pending = true
                    this.getTopics()
                        .then((res) => {
                            this.dataList = res.json().data
                            this.$broadcast('onTopLoaded', id);
                            this.pending = false
                        }, (err) => {
                            console.log('err', err)
                        })
                }
            },
            loadBottom(id) {
                if(!this.pending){
                    console.log('loadBottom called')
                    this.pending = true
                    this.page += 1
                    this.getTopics()
                        .then((res) => {
                            this.dataList = this.dataList.concat(res.json().data)
                            this.$broadcast('onBottomLoaded', id)
                            this.pending = false
                        })
                }
            },
            getTopics() {
                return this.$http.get('/api/topics', {
                    params: {
                        page: this.page,
                        tab: this.selected,
                        limit: 10
                    }
                });
            }
        },
        props: [{
            'name': 'selected',
            'default': 'all'
        }],
        ready() {
            console.log('ready called')
            this.getTopics()
                .then((res) => {
                    this.dataList = res.json().data
                }, (err) => {
                    console.log('err', err)
                })
        },
        watch: {
            selected() {
                if(!this.pending){
                    this.pending = true
                    this.page = 1
                    this.getTopics()
                        .then((res) => {
                            this.dataList = res.json().data
                            this.pending = false
                        })
                }
            }
        },
        filters: {
            date(input){
                return new Date(String(input)).getFullYear() + '/' + (new Date(String(input)).getMonth() + 1) + '/' + new Date(String(input)).getDate()
            },
            tab(input){
                return {
                    'top': '顶置',
                    'good': '精华',
                    'job': '招聘',
                    'ask': '问答',
                    'share': '分享'
                }[input]
            }
        }
    }
</script>

<style lang='less'>
    *{
      margin: 0;
      padding: 0;
    }
    html, body {
      height: 100%;
    }
    .cell{
        padding: 10px 15px;
    }
    .cell-title{
        font-size: 16px;
        color: #2c3e50;
        line-height: 1.5;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 800;
        font-family: "Helvetica-Neue", "Helvetica", Arial, sans-serif;
        &:before{
            min-width: 24px;
            text-align: center;
            padding: 3px 8px;
            display: inline-block;
            margin-right: 10px;
            font-size: 12px;
            content: attr(data-tab);
            color: #fff;
            font-weight: 400;
            vertical-align: middle;
        }
        &.share{
            &:before{
                background: #FBCA04
            }
        }
        &.ask{
            &:before{
                background: #26a2ff;
            }
        }
        &.job{
            &:before{
                background: #AE81FF;
            }
        }
        &.good{
            &:before{
                background: #41B883;
            }
        }
        &.top{
            &:before{
                background: #BD2C00;
            }
        }
    }
    .summary{
        padding-top: 10px;
        display: flex;
        img{
            height: 40px;
            width: 40px;
        }
        .infobox{
            width: 100%;
            padding-left: 4px;
            p{
                padding: 4px 0;
                font-size: 14px;
                display: flex;
                justify-content: space-between;
            }
            .visitnum b{
                color: #26a2ff;
                font-weight: 800;
            }
        }
    }
    .tag{
        background: #26A2FF;
        color: #fff;
        padding: 2px 4px;
    }
</style>
