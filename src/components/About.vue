<template >
    <div class="body">
        <h2>一个拿来熟悉vue的项目</h2>
        <a href="https://github.com/showonne/mobile-page.git">项目地址</a>
    </div>
</template>

<script>
    import {bus} from '../eventBus.js'
    export default {
        data() {
            return {
                bus: bus
            }
        },
        mounted() {
            bus.$emit('chChannel', 'about')
        }
    }
</script>
<style lang="less" scoped>
    .body{
        height: 100%;
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
    }
</style>
