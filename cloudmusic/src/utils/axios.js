import axios from 'axios'
// import Vue from 'vue'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL // 这个网址的定义在.env文件中定义好了，这是接口API的baseurl
})

request.interceptors.response.use(
  response => {
    window.response = response

    if (response.status === 200 && response.data.code === 200) {
      return response.data
    }
    return Promise.reject(response)
  },
  error => {
    console.log(error);
    return error
  }
)
export default request
