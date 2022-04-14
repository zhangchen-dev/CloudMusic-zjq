<template>
  <!-- 评论 -->
  <div class="comment">
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
import { loadMixin } from '@/utils/mixin'
import { getComment } from 'api'
export default {
  name: 'Comment',
  components: {
    MmLoading
  },
  data() {
    return {
      lockUp: true, // 是否锁定滚动加载事件，默认锁定
      hotComments: [], // 精彩评论
      commentList: [], // 最新评论
      page: 0, // 分页
      total: null // 评论总数
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      getComment(this.$route.params.id, this.page).then((res) => {
        this.hotComments = res.hotComments
        this.commentList = res.comments
        this.total = res.total
        this.lockUp = true
        this._hideLoad() // 加载完毕，取消动画
      })
      console.log(this.total, this.hotComments)
    }
  },

  mixins: [loadMixin]
}
</script>
<style>
</style>
