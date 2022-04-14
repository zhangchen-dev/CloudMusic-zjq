import { playMode } from '@/config'
import { getMode } from '@/utils/storage'
const state = {
  audioEle: null, // audio元素
  mode: Number(getMode()) || playMode.listLoop, // 播放模式，默认列表循环
  playlist: [], // 播放列表
  playing: false, // 播放状态
  currentIndex: -1, // 当前音乐索引
  orderList: [] // 顺序播放列表
}
export default state
