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
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.bindEvents() // 添加绑定事件
      const barWidth = this
    })
  },
  methods: {
    // 添加绑定事件
    bindEvents() {
      // 鼠标移动
      document.addEventListener('mousemove', this.barMove)
      document.addEventListener('mouseup', this.barUp)
      // 触摸事件
      document.addEventListener('touchmove', this.barMove)
      document.addEventListener('touchend', this.barUp)
    },
    // 移除绑定事件
    unbindEvents() {
      // 鼠标移动
      document.removeEventListener('mousemove', this.barMove)
      document.removeEventListener('mouseup', this.barUp)
      // 触摸事件
      document.removeEventListener('touchmove', this.barMove)
      document.removeEventListener('touchend', this.barUp)
    },
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
      this.move.startX = e.clientX || e.touches[0].pageX // 获取触摸点击源点
      this.move.left = this.$refs.mmProgressInner.clientWidth
    },
    // 鼠标/触摸移动事件
    barMove(e) {
      if (!this.move.status) {
        return false
      }
      e.preventDefault()
      let endX = e.clientX || e.touches[0].pageX
      let dist = endX - this.move.startX
      let offsetWidth = Math.min(
        this.$refs.mmProgress.clientWidth - dotWidth,
        Math.max(0, this.move.left + dist)
      )
      this.moveSlide(offsetWidth)
      this.commitPercent()
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
    },
    // 鼠标/触摸释放事件
    barUp(e) {
      if (this.move.status) {
        this.commitPercent(true)
        this.move.status = false
      }
    }
  }
}
</script>
<style lang="less">
.mmProgress {
  position: relative;
  padding: 5px;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  .mmProgress-bar {
    height: 2px;
    width: 100%;
    background: @bar_color;
  }
  .mmProgress-outer {
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: rgba(255, 255, 255, 0.2);
  }
  .mmProgress-inner {
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: @line_color;
    .mmProgress-dot {
      position: absolute;
      top: 50%;
      right: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: @dot_color;
      transform: translateY(-50%);
    }
  }
}
</style>
