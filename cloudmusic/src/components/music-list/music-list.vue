<template>
  <!-- 歌曲列表 -->
  <div class="musicList">
    <template v-if="list.length > 0">
      <div class="list-item list-header">
        <span class="list-name">歌曲</span>
        <span class="list-artist">歌手</span>
        <span class="list-time" v-if="listType === 1">时长</span>
        <span class="list-ablum" v-else>专辑</span>
      </div>
      <div class="list-content" ref="listContent" @scroll="listScroll($event)">
        <div
          v-for="(item, index) in list"
          :key="item.id"
          class="list-item"
          :class="{ on: playing && currentMusic.id === item.id }"
          @dblclick="selectItem(item, index, $event)"
        ></div>
      </div>
    </template>
    <div v-else>title="弄啥嘞，怎么啥也没有！！！"</div>
  </div>
</template>
<script>
export default {
  name: 'MusicList',
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
