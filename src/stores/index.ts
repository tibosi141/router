import { ref } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/utils/apis/user'
import type { UserData } from '@/utils/interface/user'
import { getRealData } from '@/utils/apis/covid19'
import type { Children, ChinaAdd, ChinaTotal, LocalCityNCOVDataList, RootObject } from '@/utils/interface/covid19'

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
},
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

export const useCovidStore = defineStore({
  id: 'Covid19',
  state: () => ({
    data: <RootObject>{},
    currentData: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <LocalCityNCOVDataList[]>[]
  }),
  actions: {
    async getData () {
      const result = await getRealData()
      this.data = result
      this.chinaAdd = this.data.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.data.diseaseh5Shelf.chinaTotal
      this.cityDetail = this.data.localCityNCOVDataList
    }
  }
})