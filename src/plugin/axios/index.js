import axios from 'axios'
import { Notify } from 'vant'
import store from '@/store/jushi/modules/auth'

// 记录和显示错误
function errorLog (err) {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }
  // 显示提示
  Notify({
    message: err.message,
    duration: 1000,
    background: '#1989fa'
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000 // 请求超时时间
})
// 请求的拦截器
service.interceptors.request.use(config => {
  const token = store.state.token
  console.log(config)
  // token不为null并且不是登录
  if (token != null && config.url !== '/api/uaa/authorize') {
    config.headers = {
      Authorization: `Bearer ${token}`,
      ...config.headers
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(res => {
  return res.data
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '未授权，请登录'
        break
      case 403:
        err.message = 'token过期请重新登录'
        break
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器内部错误'
        break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
        break
    }
  }
  errorLog(err)
  return Promise.reject(err)
})

export default {
  install (Vue) {
    Vue.prototype.$axios = service
  },
  service
}





