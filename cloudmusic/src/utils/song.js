// 歌曲数据格式化

// 推荐歌单歌曲数据格式化
export const formatTopSongs = function formatTopSongs(list) {
  // let Song = []
  list.forEach(item => {
    const musicData = item
    if (musicData.id) {
      console.log(musicData)
    }
  })
}
