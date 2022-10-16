import { ref } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/utils/apis/user'
import type { UserData, Result } from '@/utils/types/user'
import { getRealData } from '@/utils/apis/covid19';
import type { RootObject } from '@/utils/types/covid19'

export const useUserStore = defineStore('User', () => {
  let avatar = ref<string>('')
  let userName = ref<string>('')
  let loginStatus = ref<boolean>(false)

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

export const useCovidStore = defineStore({
  id: 'Covid19',
  state: () => ({
    data: <RootObject>{}
  }),
  actions: {
    async getData() {
      const result = await getRealData()
      this.data = result
    }
  }
})