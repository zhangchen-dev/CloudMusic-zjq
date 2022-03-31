import * as types from './mutations-types'

const mutations = {
  // 修改audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  },
  // 修改网易云用户UID
  [types.SET_UID](state, uid) {
    state.uid = uid
  }
}
export default mutations
