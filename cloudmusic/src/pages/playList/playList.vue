<template>
  <div class="playList">
    <!-- 当前的播放列表 -->
    <music-list
      :list="playlist"
      :list-type="1"
      @select="selectItem"
      @del="deleteItem"
    >
      <div slot="listBtn" class="list-btn">
        <span @click="$refs.dialog.show()">清空列表</span>
      </div>
    </music-list>
    <mm-dialog
      ref="dialog"
      body-text="是否清空正在播放的列表"
      confirm-btn-text="清空"
      @confirm="clearList"
    />
  </div>
</template>
<script>
import MusicList from 'components/music-list/music-list.vue'
import MmDialog from 'base/mm-dialog/mm-dialog.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'PlayList',
  components: { MusicList, MmDialog },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['playlist', 'currentMusic'])
  },
  methods: {
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    clearList() {
      // this.clearPlayList()
      console.log('清空播放列表方法，并且提交这个数据到全局状态中进行管理')
    },
    // 播放暂停键
    selectItem(item, index) {
      console.log(item)
      if (item.id !== this.currentMusic.id) {
        this.setCurrentIndex(index)
        this.setPlaying(true)
      }
    },
    deleteItem(index) {
      console.log('123')
    }
  }
}
</script>
<style lang="less">
.playList {
  position: relative;
  width: 100%;
  height: 100%;
  .musicList {
    width: 100%;
    height: 100%;
    .list-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      span {
        padding: 5px 20px;
        cursor: pointer;
        user-select: none;
        &:hover {
          color: @text_color_active;
        }
      }
    }
  }
}
</style>
