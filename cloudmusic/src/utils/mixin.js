export const loadMixin = {
  data() {
    return {
      mmLoadShow: true // loading状态
    }
  },
  methods: {
    _hideLoad() {
      console.log('hello 转动');
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.mmLoadShow = false
      }, 200)
    }
  }
}
