<template>
  <!-- 主页面头部 -->
  <header class="mm-header">
    <h1 class="header">
      <a href="https://github.com/maomao1996/Vue-mmPlayer" target="_blank">
        cloudmusic 在线音乐播放器
      </a>
    </h1>
    <dl class="user">
      <template v-if="user.userId">
        <router-link class="user-info" to="/music/userlist" tag="dt">
          <img class="avatar" :src="`${user.avatarUrl}?50y50`" alt="" />
          <span>{{ user.nickname }}</span>
        </router-link>
        <dd class="user-btn" @click="openDialog(2)">退出</dd>
      </template>
      <dd v-else class="user-btn" @click="openDialog(0)">登录/login</dd>
    </dl>
    <!-- 登录 -->
    <mm-dialog
      ref="loginDialog"
      head-text="登录"
      confirm-btn-text="開始登录"
      cancel-btn-text="关闭"
      @confirm="login"
    >
      <div class="mm-dialog-text">
        <input
          v-model.trim="uidValue"
          type="number"
          class="mm-dialog-input"
          placeholder="请输入您的网易云UID"
          @keyup.enter="login"
        />
        <div slot="btn" @click="openDialog(1)">帮助</div>
      </div>
    </mm-dialog>
    <!-- 帮助 -->
    <mm-dialog
      ref="helpDialog"
      head-text="登录帮助"
      confirm-btn-text="去登陆"
      cancel-btn-text="关闭"
      @confirm="openDialog(0)"
    >
      <div class="mm-dialog-text">
        <p>点我登录</p>
      </div>
    </mm-dialog>
    <!-- 退出 -->
    <mm-dialog
      ref="outDialog"
      body-text="确定退出当前用户吗？"
      @confirm="out"
    />
  </header>
</template>
<script>
import MmDialog from 'base/mm-dialog/mm-dialog'
import { getUserPlaylist } from 'api'
import { mapActions } from 'vuex'
import { toHttps } from '@/utils/util'

export default {
  name: 'Mmheader',
  components: { MmDialog },
  data() {
    return {
      user: {}, // 用户数据
      uidValue: '' // 记录用户UID
    }
  },
  created() {
    // 如果帐户信息存在，请求用户数据
    this.uid && this._getUserPlaylist(this.uid)
  },
  methods: {
    openDialog(key) {
      switch (key) {
        case 0:
          // console.log('点击打开对话框')
          this.$refs.loginDialog.show()
          break
        case 1:
          this.$refs.helpDialog.show()
          break
        case 2:
          this.$refs.outDialog.show()
          break
        case 3:
          this.$refs.loginDialog.hide()
          break
      }
    },
    // 点击操作
    // 登录
    login() {
      console.log('hello user')
      if (this.uidValue === '') {
        alert('uid不能为空！')
        return
      }
      this.openDialog(3) // 登录成功退出登录页面
      console.log('hello new people')
      // 资源请求
      this._getUserPlaylist(this.uidValue)
    },
    // 依据输入的帐户获取用户数据
    _getUserPlaylist(uid) {
      // console.log(getUserPlaylist(uid))
      getUserPlaylist(uid).then(({ playlist = [] }) => {
        // 箭头函数的这种用法怎么回事？？？？
        this.uidValue = ''
        if (playlist.length === 0 || !playlist[0].creator) {
          // 为查询到此用户
          alert(`没有查询到${uid}的数据`)
          return
        }
        const creator = playlist[0].creator
        // 提交全局状态uid为当前登录进的
        this.setUid(uid)
        // 这一步作用？将http链接转换为https链接
        creator.avatarUrl = toHttps(creator.avatarUrl)
        this.user = creator
        setTimeout(() => {
          console.log(`${this.user.nickname}欢迎使用`)
        }, 200)
      })
    },
    ...mapActions(['setUid']),
    out() {
      this.user = {}
      this.setUid(null)
      alert('退出成功')
    }
  }
}
</script>

<style lang="less">
.mm-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  @media (max-width: 768px) {
    background: @header_bg_color;
  }
  .header {
    text-align: center;
    line-height: 60px;
    color: @text_color_active;
    font-size: @font_size_large;
    @media (max-width: 768px) {
      padding-left: 15px;
      text-align: left;
    }
  }
  .user {
    position: absolute;
    top: 50%;
    right: 15px;
    line-height: 30px;
    text-align: right;
    transform: translateY(-50%);
    &-info {
      float: left;
      margin-right: 15px;
      cursor: pointer; // 这个css属性的作用
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 90px;
        vertical-align: middle;
      }
      span {
        margin-left: 100px;
        color: @text_color_active;
      }
    }
    &-btn {
      float: left;
      cursor: pointer;
      &:hover {
        color: @text_color_active;
      }
    }
    @media (max-width: 768px) {
      &-info {
        margin-right: 10px;
        span {
          display: none;
        }
      }
    }
  }
}
.mm-dialog-input {
  text-align: left;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding: 0 15px;
  background: transparent;
  color: yellow;
  font-size: 14px;
  outline: 0;
  &::placeholder {
    color: @text_color;
  }
}
.text {
  position: relative;
  top: 0;
  left: 10px;
  width: 20px;
  height: 20px;
  background-color: hotpink;
}
</style>
