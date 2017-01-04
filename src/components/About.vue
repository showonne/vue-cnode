<template >
    <div class="container">
        <mt-header title="关于项目"></mt-header>
        <div class="body">
            <h2>基于 Vue.js 的 CNode WebApp.</h2>
            <p>框架: Vue.js, Vue-Router, Mint UI.</p>
            <a href="https://github.com/showonne/mobile-page.git">Github地址</a>
        </div>
    </div>
</template>

<script>
    import { Header } from 'mint-ui'
    export default {
        name: 'About',
        components: {
            'mt-header': Header
        }
    }
</script>
<style lang="less" scoped>
    .container{
        height: 100%;
    }
    .body{
        height: 100%;
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
        h2{
            margin: 20px 0;
            text-align: center;
        }
        p{
            margin: 5px 0;
        }
    }
</style>
