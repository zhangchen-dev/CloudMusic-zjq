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
      <div class="music-bar-btns">
        <!-- 播放按键等 -->
        <mm-icon
          class="pointer"
          type="prev"
          :size="36"
          title="上一曲 Ctrl+Left"
          @click="prev"
        />
        <div
          class="control-play pointer"
          title="播放暂停 Ctrl+Space"
          @click="play"
        >
          <mm-icon :type="playing ? 'pause' : 'playing'" :size="24" />
        </div>
        <mm-icon
          class="pointer"
          type="next"
          :size="36"
          title="下一曲 Ctrl+Right"
          @click="next"
        />
      </div>
      <!-- 播放条等信息 -->
      <div class="music-music">
        <div class="music-bar-info">
          <template v-if="currentMusic && currentMusic.id">
            {{ currentMusic.name }}
            <span>-{{ currentMusic.singer }}</span>
          </template>
          <template v-else>欢迎使用zjqMusicCloud在线音乐播放器</template>
        </div>
        <div class="music-bar-time" v-if="currentMusic.id">
          {{ currentTime | format }} /
          {{ currentMusic.duration % 3600 | format }}
        </div>
        <!-- 进度条调节功能 -->
        <mm-progress
          class="music-progress"
          :percent="percentMusic"
          :percent-progress="currentProgress"
          @percentChange="progressMusic"
          @percentChangeEnd="progressMusicEnd"
        />
      </div>

      <!-- 播放模式 -->
      <mm-icon
        class="icon-color pointer mode"
        :type="getModeIconType()"
        :title="getModeIconTitle()"
        :size="30"
        @click="modeChange"
      />
      <!-- 评论 -->
      <mm-icon
        class="icon-color pointer comment"
        type="comment"
        :size="30"
        @click="openComment"
      />
    </div>
    <!-- 遮罩 -->
    <div class="mmPlayer-bg" :style="{ backgroundImage: picUrl }"></div>
    <div class="mmPlayer-mask"></div>
  </div>
</template>
<script>
import mmPlayerMusic from './mmPlayer'
import { getLyric } from 'api'
import MusicBtn from 'components/music-btn/music-btn'
import { defaultBG, playMode } from '@/config'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MmProgress from 'base/mm-progress/mm-progress.vue'
import Lyric from 'components/lyric/lyric'
import {
  silencePromise,
  format,
  parseLyric,
  randomSortArray
} from '@/utils/util'
import MmIcon from 'base/mm-icon/mm-icon.vue'

export default {
  name: 'Music',
  components: { MusicBtn, MmProgress, Lyric, MmIcon },
  filters: {
    // 時間格式化
    format
  },
  data() {
    return {
      lyricVisible: false, // 移动端歌词显示
      currentTime: 0, // 当前播放音乐时间
      musicReady: false, // 是否可以使用播放器
      lyric: [], // 歌词初始值
      lyricIndex: 0, // 当前播放歌词下标
      currentProgress: 0 // 当前缓冲进度
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
    percentMusic() {
      const duration = this.currentMusic.duration
      return this.currentTime && duration ? this.currentTime / duration : 0
    },
    ...mapGetters([
      'currentMusic',
      'playing',
      'audioEle',
      'playlist',
      'currentIndex',
      'mode',
      'orderList'
    ])
  },
  watch: {
    // 监听函数用法

    // 监听当前播放的歌曲状态改变
    currentMusic(newMusic, oldMusic) {
      console.log('监测下一曲中', newMusic, oldMusic)
      if (!newMusic.id) {
        // 歌词置空
        this.lyric = []
        return null
      }
      if (newMusic.id === oldMusic.id) {
        return null
      }
      this.audioEle.src = newMusic.url
      // 播放歌曲改变，重置相关参数
      this.lyricIndex = this.currentTime = this.currentProgress = 0
      silencePromise(this.audioEle.play())
      this.$nextTick(() => {
        this._getLyric(newMusic.id)
      })
    },
    // 监听当前播放状态
    playing(newPlaying) {
      const audio = this.audioEle
      this.$nextTick(() => {
        // 监听收到新值的true/false
        newPlaying ? silencePromise(audio.play()) : audio.pause()
        this.musicReady = true
      })
    },
    // 监听播放歌曲的时长数据
    currentTime(newTime) {
      if (this.nolyric) {
        return null
      }
      let lyricIndex = 0 // 确定歌词到那一句了，也即歌词的下标
      for (let i = 0; i < this.lyric.length; i++) {
        // 依据改变的歌词找该显示的歌词的时长位置
        if (newTime > this.lyric[i].time) {
          lyricIndex = i
        }
      }
      this.lyricIndex = lyricIndex
    }
  },
  mounted() {
    this.$nextTick(() => {
      mmPlayerMusic.initAudio(this) // 加載多媒體事件，此处选定就是多媒体播放标签
      this.initKeyDown()
    })
  },
  methods: {
    // 按键事件
    initKeyDown() {
      document.onkeydown = (e) => {
        switch (e.ctrlKey && e.keyCode) {
          case 32: // 播放暂停Ctrl + Space
            this.play()
            break
          case 37: // 上一曲Ctrl+Left
            this.prev()
            break
        }
      }
    },
    // 获取歌词
    _getLyric(id) {
      getLyric(id).then((res) => {
        if (res.nolyric) {
          this.nolyric = true
        } else {
          this.nolyric = false
          this.lyric = parseLyric(res.lrc.lyric)
        }
        silencePromise(this.audioEle.play())
      })
    },
    // 关闭歌词
    handleCloseLyric() {
      this.lyricVisible = false
    },
    // 打开歌词
    handleOpenLyric() {
      this.lyricVisible = true
    },
    // 播放上一曲
    prev() {
      if (!this.musicReady) {
        return null
      }
      console.log('播放上一曲', this.currentIndex)
      if (this.playlist.length === 1) {
        // 只有一首歌就循环
        this.loop()
      } else {
        let index = this.currentIndex - 1
        console.log(index)
        if (index < 0) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing && this.musicReady) {
          this.setPlaying(true)
        }
        this.musicReady = false
      }
    },
    // 播放/暂停按钮
    play() {
      if (!this.musicReady) {
        return null
      }
      this.setPlaying(!this.playing)
    },
    // 播放下一曲
    next(flag = false) {
      if (!this.musicReady) {
        return
      }
      const {
        playlist: { length }
      } = this
      if (
        // 此处的意义：当前播放歌曲为列表中的最后一首歌曲，点击下一曲出现的操作
        // 此处执行的条件是还有一个播放模式为顺序播放模式
        (length - 1 === this.currentIndex && this.mode === playMode.order) ||
        // length - 1 === this.currentIndex ||
        (length === 1 && flag)
      ) {
        this.setCurrentIndex(-1)
        this.setPlaying(false)
        return null
      }
      if (length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === length) {
          index = 0
        }
        // console.log(this.playing, this.musicReady, this)
        // 这里添加播放状态取反的值意义何在，不添加在点击播放下一曲是也会可以实现功能？？？？？？
        if (!this.playing && this.musicReady) {
          this.setPlaying(true)
        }
        this.setCurrentIndex(index)
        this.musicReady = false
      }
    },

    // 播放模式
    loop() {
      console.log('循环播放模式--------')
      this.audioEle.currentTime = 0
      silencePromise(this.audioEle.play())
      this.setPlaying(true)
      if (this.lyric.length > 0) {
        this.lyricIndex = 0
      }
    },
    // 修改音乐显示时长
    progressMusic(percent) {
      this.currentTime = this.currentMusic.duration * percent
    },
    // 修改音乐进度
    progressMusicEnd(percent) {
      this.audioEle.currentTime = this.currentMusic.duration * percent
    },
    // 获取播放模式的icon
    getModeIconType() {
      return {
        [playMode.listLoop]: 'loop',
        [playMode.order]: 'sequence',
        [playMode.random]: 'random',
        [playMode.loop]: 'loop-one'
      }[this.mode]
    },
    // 获取播放模式title
    getModeIconTitle() {
      const key = 'Ctrl + O'
      return {
        [playMode.listLoop]: `列表循环${key}`,
        [playMode.order]: `顺序播放${key}`,
        [playMode.random]: `随机播放${key}`,
        [playMode.loop]: `单曲循环${key}`
      }[this.mode]
    },
    // 修改播放模式
    modeChange() {
      console.log('修改播放模式中。。。')
      const mode = (this.mode + 1) % 4
      this.setPlayMode(mode)
      let list = []
      if (mode === playMode.loop) {
        console.log('11111111111')
        return null
      }
      // console.log(mode)
      switch (mode) {
        // 依据播放模式修改播放列表
        case playMode.listLoop:
        case playMode.order:
          list = this.orderList
          break
        case playMode.random:
          list = randomSortArray(this.orderList)
          break
      }
      this.resetCurrentIndex(list) // 此处修改播放列表
      this.setPlaylist(list)
      console.log(this.mode, list)
    },
    // 修改当前播放索引，注意乱序的知识修改播放的随机值，播放列表顺序不发生改变
    resetCurrentIndex(list) {
      const index = list.findIndex((item) => {
        return item.id === this.currentMusic.id
      })
      this.setCurrentIndex(index)
    },
    // 打开音乐评论
    openComment() {
      if (!this.currentMusic.id) {
        console.log('还没有播放歌曲哦')
        return false
      }
      // 跳到评论页面
      this.$router.push(`/music/comment/${this.currentMusic.id}`)
    },
    // 提交状态的一些方法
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    // 异步的一些提交方法
    ...mapActions(['setPlayMode'])
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
  overflow: hidden;
  .music-content {
    display: flex;
    width: 100%;
    height: calc(~'100% - 80px');
    .music-left {
      flex: 1;
      height: 100%;
      overflow: hidden;
      .music-list {
        height: calc(~'100% - 60px');
      }
    }
    .music-right {
      position: relative;
      width: 310px;
      margin-left: 10px;
      .close-lyric {
        position: absolute;
        top: 0;
        z-index: 1;
        cursor: pointer;
      }
    }
  }

  /*底部mmPlayer-bar*/
  .music-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding-bottom: 15px;
    color: #fff;
    &.disable {
      pointer-events: none;
      opacity: 0.6;
    }
    .icon-color {
      color: #fff;
    }
    .music-bar-btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 180px;
      .control-play {
        .flex-center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.3);
        .icon-bofang101 {
          transform: translateX(2px);
        }
      }
    }

    .flex-center;
    .btn-prev {
      width: 19px;
      min-width: 19px;
      height: 20px;
      background-position: 0 -30px;
    }
    .btn-play {
      width: 21px;
      min-width: 21px;
      height: 29px;
      margin: 0 50px;
      background-position: 0 0;
      &.btn-play-pause {
        background-position: -30px 0;
      }
    }
    .btn-next {
      width: 19px;
      min-width: 19px;
      height: 20px;
      background-position: 0 -52px;
    }
    .music-music {
      position: relative;
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      padding-left: 40px;
      font-size: @font_size_small;
      color: @text_color_active;
      .music-bar-info {
        height: 15px;
        padding-right: 80px;
        line-height: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .music-bar-time {
        position: absolute;
        top: 0;
        right: 5px;
      }
    }
    .mode,
    .comment,
    .music-bar-volume {
      margin-left: 20px;
    }

    // 音量控制
    .volume-wrapper {
      margin-left: 20px;
      width: 150px;
    }
  }

  /*遮罩*/
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

  @media (min-width: 960px) {
    .close-lyric {
      display: none;
    }
  }

  //当屏幕小于960时
  @media (max-width: 960px) {
    .music-right {
      display: none;
      &.show {
        display: block;
        margin-left: 0;
        width: 100%;
      }
    }
  }
  //当屏幕小于768时
  @media (max-width: 768px) {
    & {
      padding: 75px 15px 5px 15px;
    }

    .music-content .music-left {
      .music-list {
        font-size: @font_size_medium;
      }
    }

    .music-bar {
      .music-bar-info span,
      .music-bar-volume .mmProgress {
        display: none;
      }
    }
  }
  //当屏幕小于520时
  @media (max-width: 520px) {
    .music-bar {
      position: relative;
      flex-direction: column;
      .music-bar-btns {
        width: 60%;
        margin-top: 15px;
        order: 2;
      }
      .music-music {
        padding-left: 0;
        order: 1;
      }
      & > i.mode {
        position: absolute;
        top: 40px;
        left: 5px;
        margin: 0;
      }
      .comment {
        position: absolute;
        top: 40px;
        right: 5px;
      }
      .music-bar-volume {
        display: none;
      }
    }
  }
}
</style>
