import axios from '@/utils/axios'
import { formatTopSongs } from '@/utils/song'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL

// 请求用户数据歌单详情
export function getUserPlaylist(uid) {
  return axios.get('/user/playlist', {
    params: {
      uid
    }
  })
}

// 歌单详情
export function getPlaylistDetail(id) {
  return new Promise((resolve, reject) => {
    axios
      .get('/playlist/detail', {
        params: { id }
      })
      .then(({ playlist }) => playlist || {})
      .then(playlist => {
        console.log(playlist);
        const { trackIds, tracks } = playlist // 这一步用法的具体含义？？？已解决！
        console.log(tracks);
        if (!Array.isArray(trackIds)) {
          reject(new Error('获取歌单详情失败'))
        }
        // 过滤歌单 如排行榜 此处疑问，为何这样比较，他两赋值不是同一个参数吗，长度一定相同，为何还要判断？？？已解决！
        if (tracks.length === trackIds.length) {
          // 数据格式化，获得每首歌曲的实例后的数据组成的数组
          playlist.tracks = formatTopSongs(playlist.tracks)
          resolve(playlist)
        }
      })
  })
}
