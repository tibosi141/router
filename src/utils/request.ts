import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const request = axios.create({
  baseURL: '/api',
  timeout: 4 * 60 * 1000
})

export default request