<template>
  <div id="app">
    <!-- 主体 -->
    <mm-header />
    <router-view class="router-view" />
    <!-- 更新说明 -->
    <mm-dialog ref="versionInfo" type="alert" head-text="更新提示" />
    <!-- 播放器 -->
    <audio ref="mmPlayer">hello 我是播放器</audio>
  </div>
</template>

<script>
import MmHeader from 'components/mm-header/mm-header'
import MmDialog from 'base/mm-dialog/mm-dialog'
import { mapActions, mapMutations } from 'vuex'
import { getPlaylistDetail } from 'api'
import { defaultSheetId } from '@/config'
import { createTopList } from '@/utils/song'
export default {
  name: 'App',
  components: {
    MmHeader,
    MmDialog
  },
  created() {
    // 设置播放audio元素
    this.$nextTick(() => {
      this.setAudioele(this.$refs.mmPlayer)
    })
    // 获取正在播放的列表 2022.4.1☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
    getPlaylistDetail(defaultSheetId).then((playlist) => {
      const list = playlist.tracks.slice(0, 100)
      this.setPlaylist({ list })
    })
  },
  mounted() {
    this.version()
  },
  methods: {
    // 歌曲数据处理，这一步是怎么调用的，它存在的意义又是啥？？？？
    _formatSongs(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item
        if (musicData.id) {
          ret.push(createTopList(musicData))
        }
      })
      return ret
    },
    version() {
      console.log(this.$refs.versionInfo) // ?? 此处为何直接不显示这个组件
      this.$refs.versionInfo.show()
    },
    ...mapMutations({
      setAudioele: 'SET_AUDIOELE'
    }),
    ...mapActions(['setPlaylist'])
  }
}
</script>

<style lang="less" scoped>
#app {
  position: relative;
  display: block;
  width: 100%;
  height: 750px;
  color: @text_color;
  font-size: @font_size_medium;
}
.router-view {
  width: 100%;
  height: 100%;
  audio {
    position: fixed;
  }
}
</style>
