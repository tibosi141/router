import createAxios from '@/utils/request'

export function getRealData() {
  return createAxios({ url: '/getRealData' })
}
