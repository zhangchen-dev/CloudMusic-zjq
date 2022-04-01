<template>
  <div class="music-btn">
    <!-- 歌单控件 -->
    <router-link to="/music/playlist" tag="span">正在播放</router-link>
    <router-link to="/music/toplist" tag="span">推荐</router-link>
    <router-link to="/music/search" tag="span">搜索</router-link>
    <router-link to="/music/userlist" tag="span"> 我的歌单</router-link>
    <span class="show-960" @click="$emit('onClickLyric')">歌词(开启开关)</span>
    <router-link to="/music/historylist" tag="span">我听过的</router-link>
  </div>
</template>
<script>
export default {
  name: 'MusicBtn',
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.music-btn {
  width: 100%;
  height: 60px;
  font-size: 0px;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  span {
    display: inline-block;
    height: 40px;
    box-sizing: border-box;
    margin-right: 8px;
    padding: 0 23px;
    border: 1px solid @btn_color;
    border-radius: 2px;
    line-height: 40px;
    overflow: hidden;
    font-size: 14px;
    cursor: pointer;
    &:nth-last-of-type(1) {
      margin: 0;
    }
  }
  &:hover,
  &.active {
    border-color: @btn_color_active;
    color: @btn_color_active;
  }
  @media (min-width: 960px) {
    span.show-960 {
      display: none;
    }
    @media (max-width: 960px) {
      display: inline-block;
    }
    @media (max-width: 750px) {
      height: 50px;
      span {
        height: 35px;
        padding: 0 10px;
        margin-right: 6px;
        line-height: 35px;
      }
    }
  }
}
</style>
