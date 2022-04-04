import { setUserId } from '@/utils/storage'
import * as types from './mutations-types'

// 设置网易云用户UID
export const setUid = function ({ commit }, uid) {
  commit(types.SET_UID, setUserId(uid))
}

// 设置播放列表
// 提交方式的对象提交方式，注意此处歌单的加载是由异步请求得到的，所以此处的状态管理就是使用异步方式进行管理
export const setPlaylist = function ({ commit }, { list }) {
  commit(types.SET_PLAYLIST, list)
}
