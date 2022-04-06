<!-- 2022.1.25 start... -->
<template>
  <div class="music">
    <div class="music-content">
      <div class="music-left">
        <!-- 按键关于是否打开歌词 -->
        <music-btn @onClickLyric="handleOpenLyric" />
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
import { defaultBG } from '@/config'
import { mapGetters } from 'vuex'
export default {
  name: 'Music',
  components: { MusicBtn, Lyric },
  data() {
    return {
      lyricVisible: false // 移动端歌词显示
    }
  },
  computed: {
    picUrl() {
      // 返回当前歌曲的封面图片
      let a =
        this.currentMusic.id && this.currentMusic.image
          ? `url(${this.currentMusic.image}?param=300y300)`
          : `url(${defaultBG})`
      return a
    },
    ...mapGetters(['currentMusic'])
  },
  methods: {
    // 关闭歌词
    handleCloseLyric() {
      this.lyricVisible = false
    },
    // 打开歌词
    handleOpenLyric() {
      this.lyricVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.music {
  padding: 75px 25px 25px 25px;
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
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
    }
    .music-right {
      display: none;
      position: relative;
      // display: none;
      width: 310px;
      height: 100%;
      margin-left: 10px;
    }
    .music-bar {
      display: flex;
      align-content: center;
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      color: #fff;
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(12px);
    opacity: 0.7;
    transition: all 0.8s;
    transform: scale(1.1);
  }
}
</style>
