import type { UserData } from '@/utils/interface/user'
import createAxios from '@/utils/request'

export function userAPI(params: {}) {
  return createAxios(
    {
      url: '/user',
      method: 'get',
      params,
    }
  )
}

export function login(data: UserData) {
  return createAxios(
    {
      url: '/user/create',
      method: 'post',
      data,
    },
    {
      loading: true,
    },
    {
      text: '登陆中~请稍后',
    }
  )
}

export function download() {
  return createAxios({
    url: '/upload/stream',
    method: 'get',
    responseType: 'arraybuffer',
  })
}
