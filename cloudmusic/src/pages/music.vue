<!-- 2022.1.25 start... -->
<template>
  <div class="music">
    <div class="music-content">
      <div class="music-left">
        <music-btn />
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="music-list" />
        </keep-alive>
      </div>
      <router-view
        v-if="!$route.meta.keepAlive"
        class="music-list"
        :key="$route.path"
      />
      <div class="music-right" :class="{ show: lyricVisible }">
        <div class="close-lyric" @click="handleCloseLyric">关闭歌单词</div>
        <lyric ref="lyric">我是要关闭的歌词</lyric>
      </div>
    </div>
    <!-- 播放器 -->
    <div class="music-bar">
      <!-- 播放按键等 -->
      播放按键等
      <div class="music-bar-btns"></div>
    </div>
    <!-- 遮罩 -->
    <div class="mmPlayer-bg" :style="{ backgroundImage: picUrl }"></div>
    <div class="mmPlayer-mask"></div>
  </div>
</template>
<script>
import MusicBtn from 'components/music-btn/music-btn'
import Lyric from 'components/lyric/lyric.vue'
export default {
  name: 'Music',
  components: { MusicBtn, Lyric },
  data() {
    return {
      lyricVisible: true
    }
  },
  computed: {
    picUrl() {
      // 返回当前歌曲的封面图片
      return null
    }
  },
  methods: {
    handleCloseLyric() {
      // 关闭歌词
      this.lyricVisible = false
    }
  }
}
</script>

<style lang="less">
.music {
  padding: 75px 25px 25px 25px;
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  background-color: skyblue;
  // overflow: hidden;
  .music-content {
    display: flex;
    width: 100%;
    height: 100%;
    .music-left {
      flex: 1;
      height: 100%;
      width: 100%;
      overflow: hidden;
      background-color: blue;
    }
    .music-right {
      display: none;
      position: relative;
      // display: none;
      width: 310px;
      height: 100%;
      margin-left: 10px;
      background-color: red;
    }
    .music-bar {
      display: flex;
      align-content: center;
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      color: #245;
    }
    .show {
      display: block;
    }
  }
  .mmPlayer-mask,
  .mmPlayer-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  .mmPlayer-mask {
    z-index: -1;
    background-color: @mask_color;
  }
  .mmPlayer-bg {
    z-index: -2;
  }
}
</style>
