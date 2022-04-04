// audio元素
export const audioEle = state => state.audioEle
// 播放列表
export const playlist = state => state.playList
// 播放状态
export const playing = state => state.playing
// 当前音乐
export const currentMusic = state => {
  return state.playlist[state.currentIndex] || {}
}
