import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { getToken } from '@/utils/auth'
import { ElMessage, ElLoading, LoadingOptions } from 'element-plus'

const pendingMap = new Map()

const LoadingInstance: LoadingInstance = {
  target: null,
  count: 0,
}

export default function createAxios(axiosConfig: AxiosRequestConfig, customOptions?: CostomOptions, loadingOptions?: LoadingOptions) {
  const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 设置统一的请求前缀
    timeout: 1000 * 10, // 设置统一的超时时长
  })

  const options = Object.assign(
    {
      repeatRequsetCancel: true, // 是否开启取消重复请求, 默认为 true
      loading: false, // 是否开启loading层效果, 默认为false
      reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
      errorMessageShow: true, // 是否开启接口错误信息展示，默认为true
    },
    customOptions
  )

  // 请求拦截
  service.interceptors.request.use(
    config => {
      // removePending(config)
      options.repeatRequsetCancel && addPending(config)
      console.log(pendingMap)

      // 创建loading实例
      if (options.loading) {
        LoadingInstance.count++
        if (LoadingInstance.count === 1) {
          LoadingInstance.target = ElLoading.service(loadingOptions)
        }
      }

      // 自动携带token
      if (config.headers && getToken()) config.headers.Authorization = getToken()

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  service.interceptors.response.use(
    response => {
      // removePending(response.config)
      options.loading && closeLoading(options) // 关闭loading
      return options.reductDataFormat ? response.data : response
    },
    error => {
      error.config && removePending(error.config)
      options.loading && closeLoading(options) // 关闭loading
      options.errorMessageShow && httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )

  return service(axiosConfig)
}

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config: AxiosRequestConfig) {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}
/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken()
    pendingMap.delete(pendingKey)
  }
}

/**
 * 关闭Loading层实例
 * @param {*} options
 */
function closeLoading(options: any) {
  if (options.loading && LoadingInstance.count > 0) LoadingInstance.count--
  if (LoadingInstance.count === 0) {
    LoadingInstance.target.close()
    LoadingInstance.target = null
  }
}

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message)

  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持！'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

  ElMessage({
    type: 'error',
    message,
  })
}

interface LoadingInstance {
  target: any
  count: number
}

interface CostomOptions {
  // 是否开启取消重复请求, 默认为 true
  CancelDuplicateRequest?: boolean
  // 是否开启loading层效果, 默认为false
  loading?: boolean
  // 是否开启简洁的数据结构响应, 默认为true
  reductDataFormat?: boolean
  // 是否开启接口错误信息展示,默认为true
  showErrorMessage?: boolean
  // 是否开启code不为0时的信息提示, 默认为true
  showCodeMessage?: boolean
  // 是否开启code为0时的信息提示, 默认为false
  showSuccessMessage?: boolean
  // 当前请求使用另外的用户token
  anotherToken?: string
}
