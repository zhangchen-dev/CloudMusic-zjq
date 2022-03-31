import * as types from './mutations-types'

const mutations = {
  // 修改audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  }
}
export default mutations
