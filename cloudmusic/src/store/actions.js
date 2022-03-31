import { setUserId } from '@/utils/storage'
import * as types from './mutations-types'
// 设置网易云用户UID
export const setUid = function ({ commit }, uid) {
  commit(types.SET_UID, setUserId(uid))
}
