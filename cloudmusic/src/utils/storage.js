const _storage = window.localStorage
const storage = {
  get(key, data = []) {
    if (_storage) {
      // 三元运算符嵌套使用
      return _storage.getItem(key) ? Array.isArray(data) ? JSON.parse(_storage.getItem(key)) : _storage.getItem(key) : data
    }
  },
  set(key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  }
}

// 修改用户的uid
const USERID_KEY = '__mmPlayer_userID__'
export function setUserId(uid) {
  storage.set(USERID_KEY, uid)
  return uid
}
