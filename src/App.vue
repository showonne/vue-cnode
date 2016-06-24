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
    <div class="news-container" :style="styleObj" @touchstart="dragBegin($event)" @touchmove="dragMove($event)" @touchend="dragEnd($event)">
      <div class="loading-bar"></div>
      <div class="news-item" v-for="item in news">
        <div class="news-poster">
        </div>
        <div class="news-summary">
          <h4 class="news-title">{{item.title}}</h4>
          <span class="news-tag">{{item.tag}}</span>
          <span class="news-comment">{{item.comment}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      startOffset: 0,
      offsetY: 0
    }
  },
  methods: {
    dragBegin (e) {
      e.preventDefault()
      this.startOffset = parseInt(e.touches[0].clientY)
    },
    dragMove (e) {
      this.offsetY = parseInt(e.touches[0].clientY)
    },
    dragEnd (e) {
      // this.offsetY = this.startOffset
    }
  },
  computed: {
    deltaOffset () {
      let delta = this.offsetY - this.startOffset
      return delta
    },
    styleObj () {
      return {
        transform: `translate3d(0, ${this.deltaOffset}px, 0)`
      }
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
  width: 100%;
}

.clx{
  &:after{
    content: '';
    display: block;
    clear: both;
  }
}

#body{
  height: 100%;
  width: 100%;
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
  z-index: 200;
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

.news-container{
  position: relative;
  margin-top: -50px;
  background: #fff;
  z-index: 2;
  .loading-bar{
    height: 50px;
    background: #ccc;
  }
  .news-item{
    padding: 20px 10px;
    display: flex;
    flex-flow: row nowrap;
    .news-poster{
      height: 80px;
      width: 30%;
      background: #ccc;
    }
    .news-summary{
      width: 70%;
      margin-left: 10px;
      .news-title{
        font-size: 20px;
        font-weight: 800;
      }
    }
  }
}

</style>
