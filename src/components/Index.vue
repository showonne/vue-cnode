<template>
    <div class="bg">
        <img src="../assets/cnodejs_light.svg" v-show="show" transition="fade-ttb" />
        <span>Pwoered by:</span>
        <div class="framework">
            <img src="../assets/logo.png" transition="fade-ltr" v-show="show" />
            <img src="../assets/mint-ui.svg" transition="fade-rtl" v-show="show" />
        </div>
        <button type="button" @click="go">Enter</button>
    </div>
</template>
<script>
    import router from '../main.js'
    import { Indicator } from 'mint-ui'
    export default{
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
                    this.$route.router.go('list')
                }, 2000)
            }
        },
        ready() {
            let that = this
            setTimeout(() => {
                that.show = true
            }, 1000)
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
