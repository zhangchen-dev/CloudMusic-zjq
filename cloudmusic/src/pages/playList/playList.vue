<template>
  <div class="playList">
    <!-- 当前的播放列表 -->
    <music-list :list="playlist">
      <div>123</div>
    </music-list>
  </div>
</template>
<script>
import musicList from 'components/music-list/music-list.vue'
import { mapGetters } from 'vuex'
export default {
  components: { musicList },
  name: 'PlayList',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['playlist'])
  }
}
</script>
<style>
</style>
