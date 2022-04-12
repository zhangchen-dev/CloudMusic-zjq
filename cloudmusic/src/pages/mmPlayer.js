const mmPlayerMusic = {
  initAudio(that) {
    const ele = that.audioEle
    console.log(ele);

    // 音频缓冲事件
    ele.onprogress = () => {
      try {
        if (ele.buffered.length > 0) {
          const duration = that.currentMusic.duration
          let buffered = 0
          ele.buffered.end(0)
          buffered = ele.buffered.end(0) > duration ? duration : ele.buffered.end(0)
          that.currentProgress = buffered / duration
        }
      } catch (e) { }
    }
    // 开始播放音乐
    // 播放防抖函数
    ele.onplay = () => {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.musicReady = true
      }, 100)
    }
    // 获取当前播放时间
    ele.ontimeupdate = () => {
      that.currentTime = ele.currentTime
    }
    // 当前播放音乐完毕，执行相关操作
    ele.onended = () => {
      // if (that.mode === playMode.loop) {
      //   console.log('循环播放歌曲');
      // } else {
      // 调用播放下一曲按钮进行播放下一曲
      that.next()
      // }
    }
  }
}

export default mmPlayerMusic
