import { setUserId, setMode } from '@/utils/storage'
import * as types from './mutations-types'

// 设置网易云用户UID
export const setUid = function ({ commit }, uid) {
  commit(types.SET_UID, setUserId(uid))
}

// 设置播放列表
// 提交方式的对象提交方式，注意此处歌单的加载是由异步请求得到的，所以此处的状态管理就是使用异步方式进行管理
export const setPlaylist = function ({ commit }, { list }) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ORDERLIST, list)
}

// 删除正在播放列表中的歌曲
export const removerPlayListItem = function ({ commit, state }, { list, index }) {
  let currentIndex = state.currentIndex
  if (index < state.currentIndex || list.length === state.currentIndex) {
    currentIndex-- // 删除的歌曲位置处于当前播放列表中的下方位置处
    commit(types.SET_CURRENTINDEX, currentIndex)
  }
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ORDERLIST, list)
  if (!list.length) {
    commit(types.SET_PLAYING, false)
  } else {
    commit(types.SET_PLAYING, true)
  }
}
export const setPlayMode = function ({ commit }, mode) {
  commit(types.SET_PLAYMODE, setMode(mode))
}
