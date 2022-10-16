import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 60 * 1000
})

// 请求拦截器
axios.interceptors.request.use(req => {
  return req
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => {
  const { data, meta } = res.data
  if (meta.status === 200 || meta.status === 201) {
    return data
  } else {
    ElMessage.error('请求失败，请联系管理员解决')
    return Promise.reject(new Error(meta.msg))
  }
}, err => {
  err.response && ElMessage.error(err.response.data)
  return Promise.reject(err.response.data)
})

export default service