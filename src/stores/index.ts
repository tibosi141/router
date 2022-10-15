import { ref } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/apis/user'
import type { UserData, Result } from '@/types/user'

export const useUserStore = defineStore('User', () => {
  const avatar = ref<string>('')
  const userName = ref<string>('')
  const loginStatus = ref<boolean>(false)

  const Login = (userData: UserData) => {
    return new Promise<any>((resolve, reject) => {
      login(userData)
        .then(res => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
    })

  }

  return {
    avatar,
    userName,
    loginStatus,
    Login,
  }
}, {
  enabled: true,
  strategies: [{
      // 自定义存储的 key，默认是 store.$id
      key: 'My_User',
      // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
      storage: localStorage,
      // state 中的字段名，按组打包储存
      paths: ['userInfo', 'rememberMe']
  }]
})