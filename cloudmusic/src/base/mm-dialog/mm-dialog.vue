<template>
  <transition name="mm-dialog-fade">
    <div v-show="dialogShow" class="mm-dialog-box">
      <div class="mm-dialog-wrapper">
        <div class="mm-dialog-content">
          <div class="mm-dialog-content" v-text="headText">
            <slot>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="mm-dialog-text" v-html="bodyText"></div>
            </slot>
            <div class="mm-dialog-btns">
              <div class="mm-btn-cancel" v-text="cancelBtnText"></div>
              <slot name="btn"></slot>
              <div class="mm-btn-confirm" v-text="confirmBtnText"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Mmdialog',
  data() {
    return {
      dialogShow: false
    }
  },
  props: {
    // 对话框按钮文字
    headText: {
      type: String,
      default: '提示'
    },
    bodyText: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  methods: {
    show() {
      this.dialogShow = true
    }
  }
}
</script>
<style lang='less'>
.mm-dialog-content {
  position: relative;
  margin: 100px auto;
  width: 300px;
  height: 100px;
  background-color: pink;
}
</style>
