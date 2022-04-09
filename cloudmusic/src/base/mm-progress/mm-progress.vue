<template>
  <!-- 进度条拖动 -->
  <div class="mmProgress" ref="mmProgress" @click="barclick">
    <div class="mmProgress-bar"></div>
    <div class="mmProgress-outer" ref="mmPercentProgress"></div>
    <div class="mmProgress-inner" ref="mmProgressInner">
      <div
        class="mmProgress-dot"
        @mousedown="barDown"
        @touchstart.prevent="barDown"
      ></div>
    </div>
  </div>
</template>
<script>
const dotWidth = 10
export default {
  name: 'MmProgress',
  data() {
    return {
      move: {
        status: false, // 是否可拖动
        startX: 0, // 记录最开始点击的X坐标
        left: 0 // 记录当前已经移动的距离
      }
    }
  },
  methods: {
    // 进度条点击事件
    barclick(e) {
      let rect = this.$refs.mmProgress.getBoundingClientRect() // 这个方法作用是获取元素的位置
      let offsetWidth = Math.min(
        this.$refs.mmProgress.clientWidth - dotWidth, // 进度条总长度
        // 计算此次点击事件使得进度条移动的距离
        Math.max(0, e.clientX - rect.left)
      )
      this.moveSlide(offsetWidth)
      this.commitPercent(true)
    },
    // 鼠标按下事件
    barDown(e) {
      this.move.status = true
      this.move.startX = e.clientX || e.touches[0].pageX
      this.move.left = this.$refs.mmProgressInner.clientWidth
    },
    // 移动滑块
    moveSlide(offsetWidth) {
      this.$refs.mmProgressInner.style.width = `${offsetWidth}px`
    },
    // 修改percent 这里的计算方法后续仔细研究!!!!
    commitPercent(isEnd = false) {
      const { mmProgress, mmProgressInner } = this.$refs // 这里的$refs的用法？？？？？
      const lineWidth = mmProgress.clientWidth - dotWidth
      const percent = mmProgressInner.clientWidth / lineWidth
      this.$emit(isEnd ? 'percentChangeEnd' : 'percentChange', percent)
    }
  }
}
</script>
<style>
</style>
