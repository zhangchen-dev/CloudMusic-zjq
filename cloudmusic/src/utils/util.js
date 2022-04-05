// 时间格式化中的补零函数
export function addZero(s) {
  return s < 10 ? '0' + s : s
}

// 将http转换为https链接
export function isString(str) {
  return typeof str === 'string'
}
export function toHttps(url) {
  if (!isString(url)) {
    return url
  }
  return url.replace('http://', 'https://')
}
// 时间格式化
export function format(value) {
  let minute = Math.floor(value / 60)
  let second = Math.floor(value % 60)
  return `${addZero(minute)}:${addZero(second)}`
}
