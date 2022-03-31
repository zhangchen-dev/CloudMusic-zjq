<!-- 2022.1.25 start... -->
<template>
  <div class="music">
    <div class="music-content">
      <div class="left">
        <music-btn />
      </div>
      <div class="right">right</div>
    </div>
    <div class="music-bar">
      <!-- 播放按键等 -->
    </div>
  </div>
  <!-- 播放器 -->
</template>
<script>
import MusicBtn from 'components/music-btn/music-btn'
export default {
  name: 'Music',
  components: { MusicBtn }
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
  background-color: skyblue;
  // overflow: hidden;
  .music-content {
    display: flex;
    width: 100%;
    height: 100%;
    .left {
      flex: 1;
      height: 100%;
      width: 100%;
      overflow: hidden;
      background-color: blue;
    }
    .right {
      position: relative;
      // display: none;
      width: 310px;
      height: 100%;
      margin-left: 10px;
      background-color: red;
    }
    .music-bar {
      display: flex;
      align-content: center;
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      color: #245;
    }
  }
}
</style>
