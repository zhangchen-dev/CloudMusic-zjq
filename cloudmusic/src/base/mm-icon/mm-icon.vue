<script>
//  icon组件
export default {
  name: 'MmIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 16
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    },
    getIconCls() {
      return { fontSize: this.size + 'px' }
    },
    getIconStyle() {
      return `icon-${this.type}`
    }
  },
  render() {
    const Icon = (
      <i
        onClick={this.onClick}
        class={`iconfont${this.getIconCls()}`}
        style={this.getIconStyle()}
      />
    )
    return Icon
  }
}
</script>
<style lang="less" scoped>
.iconfont {
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  line-height: 1;
  vertical-align: baseline;
  text-transform: none;
  speak: none;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
