<template>
    <div id="body">
        <mt-navbar class="page-part" v-model="selected" :fixed="true">
            <mt-tab-item id="all">全部</mt-tab-item>
            <mt-tab-item id="good">精华</mt-tab-item>
            <mt-tab-item id="ask">问答</mt-tab-item>
            <mt-tab-item id="share">分享</mt-tab-item>
            <mt-tab-item id="job">招聘</mt-tab-item>
        </mt-navbar>
        <div class="shadow-line"></div>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" ref="loadmore">
            <ul>
                <router-link v-for="item in dataList" :to="{name: 'detail', params: {id: item.id}}" class="cell">
                    <h2 class="cell-title" :class="[{'top': item.top, 'good': item.good}, item.tab]" :data-tab="transferTag(item)">{{item.title}}</h2>
                    <div class="summary">
                        <div class="photo">
                            <img :src="item.author.avatar_url" />
                        </div>
                        <div class="infobox">
                            <p>
                                <span class="authorname">{{item.author.loginname}}</span>
                                <span class="visitnum"><b>{{item.reply_count}}</b>/{{item.visit_count}}</span>
                            </p>
                            <p>
                                <span class="create-at">{{item.create_at | date('ago')}}</span>
                                <span class="last-reply-at">{{item.last_reply_at | date('ago')}}</span>
                            </p>
                        </div>
                    </div>
                </router-link>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import { Loadmore, Navbar, TabItem, Indicator, Tabbar } from 'mint-ui'
    export default {
        name: 'Topic',
        components: {
            'mt-loadmore': Loadmore,
            'mt-navbar': Navbar,
            'mt-tab-item': TabItem,
            'mt-tabbar': Tabbar,
        },
        data() {
            return {
                dataList: [],
                page: 1,
                selected: 'all'
            }
        },
        methods: {
            loadTop(id) {
                this.page = 1
                this.getTopics()
                    .then((res) => {
                        this.dataList = res.json().data
                        this.$refs.loadmore.onTopLoaded(id)
                    }, (err) => {
                        console.log('err', err)
                    })
            },
            transferTag(item) {
                if(item.top) return '顶置'
                if(item.good) return '精华'
                return {
                    'top': '顶置',
                    'good': '精华',
                    'job': '招聘',
                    'ask': '问答',
                    'share': '分享'
                }[item.tab]
            },
            loadBottom(id) {
                this.page += 1
                this.getTopics()
                    .then((res) => {
                        this.dataList = this.dataList.concat(res.json().data)
                        this.$refs.loadmore.onBottomLoaded(id)
                    })
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
        mounted () {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            })
            this.getTopics()
                .then((res) => {
                    this.dataList = res.json().data
                    Indicator.close()
                }, (err) => {
                    console.log('err', err)
                })
        },
        watch: {
            selected() {
                this.page = 1
                Indicator.open({
                  text: '切换中...',
                  spinnerType: 'fading-circle'
                })
                this.getTopics()
                    .then((res) => {
                        this.dataList = res.json().data
                        Indicator.close()
                    })
            }
        }
    }
</script>

<style lang='less' scoped>
    #body{
        padding-bottom: 60px;
        padding-top: 42px;
    }
    .fix-bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .shadow-line{
        height: 3px;
        width: 100%;
        box-shadow: 0 2px 2px rgba(0,0,0,.1);
    }
    .cell{
        padding: 10px 15px;
        border-bottom: 1px solid #bad1c6;
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
        .photo{
            height: 40px;
            width: 40px;
        }
        img{
            height: 100%;
            width: 100%;
        }
        .infobox{
            flex: 1;
            padding-left: 12px;
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
            .create-at, .last-reply-at{
                color: #666;
            }
        }
    }
    .tag{
        background: #26A2FF;
        color: #fff;
        padding: 2px 4px;
    }
    ul{
        padding: 0 5px;
        a{
            width: 100%;
            box-sizing: border-box;
            text-decoration: none;
            display: inline-block;
            border-bottom: 1px solid #ccc;
        }
        .authorname{
            color: #272636;
        }
        .visitnum{
            color: #000;
        }
    }
</style>
