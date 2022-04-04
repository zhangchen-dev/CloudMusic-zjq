<template>
  <!-- 歌曲列表 -->
  <div class="musicList">
    <template v-if="list.length > 0">
      <div class="list-item list-header">
        <span class="list-name">歌曲</span>
        <span class="list-artist">歌手</span>
        <span class="list-time" v-if="listType === 1">时长</span>
        <span class="list-album" v-else>专辑</span>
      </div>
      <div class="list-content" ref="listContent" @scroll="listScroll($event)">
        <!-- 这个div针对单独的歌曲定义一些标签和事件 -->
        <div
          v-for="(item, index) in list"
          :key="item.id"
          class="list-item"
          :class="{ on: playing && currentMusic.id === item.id }"
          @dblclick="selectItem(item, index, $event)"
        >
          <span class="list-num" v-text="index + 1"></span>
          <div class="list-name">
            <span>{{ item.name }}</span>
            <div class="list-menu">
              <mm-icon class="hover">2022.4.4☆☆☆☆☆☆</mm-icon>
            </div>
          </div>
          <span class="list-artist">{{ item - singer }}</span>
          <span v-if="listType === 1" class="list-time"></span>
          <span v-else class="list-album">{{ item.album }}</span>
        </div>
        <slot name="listBtn"></slot>
      </div>
    </template>
    <div v-else>title="弄啥嘞，怎么啥也没有！！！"</div>
  </div>
</template>
<script>
import MmIcon from 'base/mm-icon/mm-icon.vue'
export default {
  name: 'MusicList',
  components: { MmIcon },
  data() {
    return {}
  },
  props: {
    // 歌曲数据
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script >
<style scoped>
</style>
