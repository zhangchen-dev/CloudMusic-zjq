import axios from '@/utils/axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL
// 请求用户数据歌单详情
export function getUserPlaylist(uid) {
  return axios.get('/user/playlist', {
    params: {
      uid
    }
  })
}
