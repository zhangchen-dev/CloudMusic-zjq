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
