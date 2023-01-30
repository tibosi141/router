import { getRealData } from '@/assets/apis/covid19'
import type { Children, ChinaAdd, ChinaTotal, LocalCityNCOVDataList, RootObject } from '@/utils/interface/covid19'
import { defineStore } from 'pinia'

export const useCovidStore = defineStore({
  id: 'Covid19',
  state: () => ({
    data: <RootObject>{},
    currentData: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <LocalCityNCOVDataList[]>[],
  }),
  actions: {
    async getData() {
      const result = await getRealData()
      this.data = result.data
      this.chinaAdd = this.data.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.data.diseaseh5Shelf.chinaTotal
      this.cityDetail = this.data.localCityNCOVDataList
    },
  },
})
