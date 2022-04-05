import * as types from './mutations-types'

const mutations = {
  // 修改audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  },
  // 修改网易云用户UID
  [types.SET_UID](state, uid) {
    state.uid = uid
  },
  // 修改播放列表
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist
  },
  // 修改播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },
  // 修改当前音乐索引
  [types.SET_CURRENTINDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  }
}
export default mutations
