import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60 * 1000
})

// 请求拦截器
service.interceptors.request.use(req => {
  return req
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
  const { data } = res

  return data
}, err => {
  err.response && ElMessage.error(err.response.data)
  return Promise.reject(err.response.data)
})

export default service