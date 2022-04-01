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
      },
      {
        path: '/music/toplist', // 排行榜列表
        component: () => import('pages/topList/topList'),
        meta: {
          title: '排行榜',
          keepAlive: true
        }
      },
      {
        path: '/music/search', // 搜索
        component: () => import('pages/search/search'),
        meta: {
          title: '搜索',
          keepAlive: true
        }
      },
      {
        path: '/music/historylist', // 用户历史数据
        component: () => import('pages/historyList/historyList'),
        meta: {
          title: '我听过的'
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
