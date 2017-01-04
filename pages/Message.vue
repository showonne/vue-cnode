<template>
    <div>
        <mt-header title="消息中心"></mt-header>
        <ul class="tab">
            <li @click="chTab('has_read')" :class="{selected: cTab === 'has_read'}">已读</li>
            <li @click="chTab('hasnot_read')" :class="{selected: cTab === 'hasnot_read'}">未读</li>
        </ul>
        <ul class="message-list" v-if="current_display_message.length !== 0">
            <li v-for="message in current_display_message">
                <div class="list-item" @click="showContent(message.id)">
                    <div class="item-left">
                        <img :src="message.author.avatar_url" />
                        <span v-text="message.author.loginname"></span>
                    </div>
                    <div class="item-right">
                        <h4 v-text="message.topic.title"></h4>
                        <span v-text="message.topic.last_reply_at | date"></span>
                    </div>
                </div>
                <transition name="fade">
                    <div class="content" v-if="message.id === currentId" v-html="message.reply.content">
                    </div>
                </transition>
            </li>
        </ul>
        <h5 v-else class="none">暂无消息</h5>
    </div>
</template>

<script>
    import { bus } from '../bus.js'
    import { Header } from 'mint-ui'
    export default {
        name: 'Message',
        components: {
            'mt-header': Header
        },
        data() {
            return {
                'has_read_messages': [],
                'hasnot_read_messages': [],
                'current_display_message': [],
                'cTab': 'has_read',
                'currentId': '',
                bus: bus
            }
        },
        methods: {
            chTab(selected) {
                if(selected === 'has_read'){
                    this.current_display_message = this.has_read_messages
                }else{
                    this.current_display_message = this.hasnot_read_messages
                }
                this.cTab = selected
            },
            showContent(id) {
                if(id === this.currentId){
                    this.currentId = ''
                }else{
                    this.currentId = id
                }
            }
        },
        mounted() {
            bus.$emit('chChannel', 'message')
            this.$http.get('/api/messages', {
                params: {
                    accesstoken: localStorage.accesstoken
                }
            })
            .then((res) => {
                this.has_read_messages = res.json().data.has_read_messages
                this.hasnot_read_messages = res.json().data.hasnot_read_messages
                this.chTab('has_read')
            })
        }
    }
</script>

<style lang='less' scoped>
    .tab{
        height: 40px;
        display: flex;
        list-style: none;
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
    .content{
        padding: 10px;
        line-height: 1.4;
        border-bottom: 1px dashed #26a2ff;
    }
    .fade-leave-active, .fade-enter-active{
        opacity: 0;
    }
    .message-list{
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
            padding: 4px 0;
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
        h4{
            font-size: 24px;
            font-weight: 800;
            line-height: 1.5;
        }
    }
    .none{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 18px;
        color: grey;
    }
</style>
