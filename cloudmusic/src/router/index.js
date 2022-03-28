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
    component: () => import('pages/music')
    // children: [
    //   {
    //     path: '/music/userlist',
    //     component: () => import('pages/userList/userList')
    //   }
    // ]
  }
  // {
  //   path: '/music/playlist',
  //   component: () => import('pages/userList/userList')
  // }
]

export default new Router({
  routes
})
