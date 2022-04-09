import { toHttps } from './util'
// 歌曲数据格式化

// 歌手数据格式化
function filterSinger(singer) {
  let arr = []
  singer.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

// 定义歌曲类
export class Song {
  constructor({ id, name, singer, album, image, duration, url }) {
    this.id = id
    this.name = name
    this.singer = singer
    this.album = album
    this.image = image
    this.duration = duration
    this.url = url
  }
}

export function createTopList(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.ar.length > 0 && filterSinger(music.ar),
    album: music.al.name,
    image: toHttps(music.al.picUrl) || null,
    duration: music.dt / 1000, // 这个属性的作用??? 歌曲时长
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  })
}

// 推荐歌单歌曲数据格式化
export const formatTopSongs = function formatTopSongs(list) {
  let Songs = []
  list.forEach(item => {
    const musicData = item
    if (musicData.id) {
      // console.log(musicData)
      Songs.push(createTopList(musicData))
    }
  })
  return Songs
}
