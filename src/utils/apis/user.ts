import request from '@/utils/request'
import type { UserData, Result } from '@/utils/types/user'

export function login(data: UserData) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}