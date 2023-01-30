import { login } from '@/assets/apis/user'
import type { UserData, UserInfo } from '@/utils/interface/user'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore(
  'User',
  () => {
    const userInfo = reactive<UserInfo>({
      userName: '',
    })

    const Login = async (data: UserData) => {
      const res = await login(data)

    }

    return { userInfo, Login }
  }
  //  {
  //   enabled: true,
  //   strategies: [{
  //     // 自定义存储的 key，默认是 store.$id
  //     key: 'My_User',
  //     // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
  //     storage: localStorage,
  //     // state 中的字段名，按组打包储存
  //     paths: ['userInfo', 'rememberMe']
  //   }]
  // }
)
