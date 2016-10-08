<template>
    <div class="bg">
        <transition name="fade-ttb">
            <img src="../assets/cnodejs_light.svg" v-show="show" />
        </transition>
        <span>Pwoered by:</span>
        <div class="framework">
            <transition name="fade-ltr">
                <img src="../assets/logo.png" v-show="show" />
            </transition>
            <transition name="fade-rtl">
                <img src="../assets/mint-ui.svg" v-show="show" />
            </transition>
        </div>
        <button type="button" @click="go">Enter</button>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui'
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            go() {
                Indicator.open({
                  text: '强行loading...',
                  spinnerType: 'fading-circle'
                })
                setTimeout(() => {
                    Indicator.close()
                    this.$route.router.go('topic')
                }, 1000)
            }
        },
        mounted() {
            console.info('hh')
            let that = this
            this.$nextTick(() => {
                setTimeout(() => {
                    that.show = true
                }, 1000)
            })
        }
    }
</script>
<style lang='less'>
    .fade-ttb{
        &-transition{
            transition: all .5s ease;
        }
        &-enter{
            transform: translateY(-100%);
        }
    }
    .fade-ltr{
        &-transition{
            transition: all .5s .5s ease;
        }
        &-enter{
            transform: translateX(-200%);
        }
    }
    .fade-rtl{
        &-transition{
            transition: all .5s .5s ease;
        }
        &-enter{
            transform: translateX(200%);
        }
    }
    .bg{
        background: #e1eae6;
        height: 100%;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        &>img{
            width: 90%;
        }
        button{
            color: #2C3E50;
            background: inherit;
            padding: .5em;
            width: 50%;
            border: 2px solid #2C3E50;
            font-size: 18px;
            outline: none;
            margin-top: 40%;
            font-weight: 800;
        }
        span{
            margin: 20px 0;
            color: #2C3E50;
            font-weight: 800;
            font-size: 20px;
        }
        .framework{
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            img{
                width: 25%;
                height: 25%;
            }
        }
    }
</style>
