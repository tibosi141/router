import { defineStore } from 'pinia'
interface Result {
  success: boolean
  code?: string,
  message?: string
}
interface UserInfo {
  username: string,
  password: string
}

const login = async (userInfo: UserInfo): Promise<Result> => {
  const reslut = await fetch('/api//user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(userInfo)
  })
  return await reslut.json()
}

export const useUserStore = defineStore('User', {
  state: () => ({
    loginStatus: false,
    rememberMe: false,
    userInfo: {
      username: '',
      password: ''
    }
  }),
  actions: {
    setLoginStatus (status: boolean) {
      this.loginStatus = status
    },
    async getLoginStatus () {
      let { success } = await login(this.userInfo)
      console.log(success, '-----success-----');

      this.setLoginStatus(success)
    }
  },
  // 使用该插件，开启数据缓存
  persist: {
    //这里存储默认使用的是session
    enabled: true,
    strategies: [
      {
        //key的名称
        key: 'My_User',
        //更改默认存储，我更改为localStorage
        storage: localStorage,
        // 可以选择哪些进入local存储，这样就不用全部都进去存储了
        // 默认是全部进去存储
        paths: ['userInfo', 'rememberMe']
      }
    ]
  }
})