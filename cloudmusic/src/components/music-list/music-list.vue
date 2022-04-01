<template>
  <!-- 歌曲列表 -->
  <div class="musicList">
    <template v-if="list.length > 0">
      <div class="list-item list-header">1</div>
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
