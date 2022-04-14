// audio元素
export const audioEle = state => state.audioEle
// 播放模式
export const mode = state => state.mode
// 播放列表
export const playlist = state => state.playlist
// 播放状态
export const playing = state => state.playing
// 当前音乐索引
export const currentIndex = state => state.currentIndex
// 当前音乐
export const currentMusic = state => {
  return state.playlist[state.currentIndex] || {}
}
