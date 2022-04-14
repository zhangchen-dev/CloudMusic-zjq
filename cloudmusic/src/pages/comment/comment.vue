<template>
  <!-- 评论 -->
  <div class="comment" @load="print">
    <mm-loading v-model="mmLoadShow" />
    <dl>
      <!-- 精彩评论 -->
      <dt class="comment-title">精彩评论</dt>
      <dd class="comment-item"></dd>
      <!-- 最新评论 -->
      <dt class="comment-title">最新评论</dt>
      <dd class="comment-item"></dd>
    </dl>
  </div>
</template>
<script>
import MmLoading from 'base/mm-loading/mm-loading'
export default {
  name: 'Comment',
  components: {
    MmLoading
  },
  data() {
    return {}
  },
  methods: {
    print() {
      console.log('我是评论')
    }
  }
}
</script>
<style>
</style>
