import request from '@/utils/request'

export function getRealData() {
    return request({ url: '/getRealData' }).then(res => res.data)
}
