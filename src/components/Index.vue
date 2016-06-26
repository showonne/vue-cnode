<template>
    <div class="bg">
        <img src="../assets/cnodejs_light.svg" />
        <span>Pwoered by:</span>
        <div class="framework">
            <img src="../assets/logo.png" />
            <img src="../assets/mint-ui.svg" />
        </div>
        <button type="button" v-link="'list'">Enter</button>
    </div>
</template>
<style lang='less'>
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
            color: #fff;
            background: inherit;
            padding: .5em;
            width: 50%;
            border: 2px solid #fff;
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
