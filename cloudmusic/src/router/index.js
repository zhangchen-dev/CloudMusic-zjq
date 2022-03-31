import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music',
    component: () => import('pages/music'),
    redirect: './music/playlist',
    children: [
      {
        path: '/music/playlist', // 正在播放的列表
        component: () => import('pages/playList/playList'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/music/userlist', // 我的歌单
        component: () => import('pages/userList/userList'),
        meta: {
          title: '我的歌单',
          keepAlive: true
        }
      }
    ]
  }
  // {
  //   path: '/music/playlist',
  //   component: () => import('pages/userList/userList')
  // }
]

export default new Router({
  routes
})
