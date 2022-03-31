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
import { mapMutations } from 'vuex'
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
  },
  mounted() {
    this.version()
  },
  methods: {
    version() {
      console.log(this.$refs.versionInfo) // ?? 此处为何直接不显示这个组件
      this.$refs.versionInfo.show()
    },
    ...mapMutations({
      setAudioele: 'SET_AUDIOELE'
    })
  }
}
</script>

<style lang="less">
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
  background-color: orange;
  audio {
    position: fixed;
  }
}
</style>
