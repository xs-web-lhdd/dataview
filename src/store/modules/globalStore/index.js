// * 全局 store 配置：主题 等
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('useGlobalStore', {
  id: 'useGlobalStore',
  state: () => {
    return {
      darkTheme: false
    }
  },
  getters: {
    getDarkTheme() {
      return this.darkTheme
    },
  },
  actions: {
  },
})