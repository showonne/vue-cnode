<template>
  <div id="body">
    <header>
      <span>Title</span>
      <span>icon</span>
    </header>
    <div class="tabs-bar clx">
      <ul>
        <li class="active">头条</li>
        <li>娱乐</li>
        <li>热点</li>
        <li>体育</li>
        <li>其他</li>
      </ul>
    </div>
    <mt-loadmore :top-method="loadTop">
      <ul>
        <li v-for="item in news">
          <h1>{{item.title}}</h1>
          <h1>{{item.title}}</h1>
          <h1>{{item.title}}</h1>
          <h1>{{item.title}}</h1>
          <h1>{{item.title}}</h1>
        </li>
      </ul>
    </mt-loadmore>
    <!--
    <div id="wrapper" class="news-container" :style="styleObj" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">
      <div class="loading-bar"></div>
      <ul>
        <li v-for="item in news">
          <div class="news-item">
            <div class="news-poster">
            </div>
            <div class="news-summary">
              <h4 class="news-title">{{item.title}}</h4>
              <span class="news-tag">{{item.tag}}</span>
              <span class="news-comment">{{item.comment}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'

export default {

  data () {
    return {
      news: [{
        title: 'React',
        tag: 'Js',
        comment: 23333
      }, {
        title: 'Vue.js Simple yet powerful.',
        tag: 'Js',
        comment: 99999
      }, {
        title: 'Angular hehe',
        tag: 'Js',
        comment: 12
      }, {
        title: 'Angular hehe',
        tag: 'Js',
        comment: 12
      }, {
        title: 'Angular hehe',
        tag: 'Js',
        comment: 12
      }, {
        title: 'Angular hehe',
        tag: 'Js',
        comment: 12
      }],
      startY: 0
    }
  },
  methods: {
    handleStart(e){
      this.startY = e.touches[0].clientY
    },
    handleMove(e){
      this.currentY = e.touches[0].clientY
      console.log(this.currentY - this.startY)
    },
    handleEnd(e){

    },
    loadTop(id){
      this.news.push({
        title: 'Angular hehe',
        tag: 'Js',
        comment: 12
      })
      this.$broadcast('onTopLoaded', id);
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

.clx{
  &:after{
    content: '';
    display: block;
    clear: both;
  }
}

#body{
  background: #ccc;
}

header{
  background: #ea4141;
  padding: 5px 4px;
  color: #fff;
  font-size: 20px;
  position: relative;
  z-index: 200;
}

.tabs-bar{
  position: relative;
  ul{
    list-style: none;
    display: flex;
    justify-content: space-between;
    background: #fff;
    li{
      float: left;
      padding: 10px 15px;
      font-size: 18px;
      &.active{
        color: #ea4141;
        border-bottom: 2px solid #ea4141;
      }
    }
  }
}

</style>
