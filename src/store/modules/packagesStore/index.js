// * package 目录下信息的 store
import { defineStore } from 'pinia'
// * 引入 packages 里面的信息
import { packagesList } from '@/packages/index.js'

export const usePackagesStore = defineStore('usePackagesStore', {
  id: 'usePackagesStore',
  state: () => {
    return {
      packagesList: Object.freeze(packagesList)
    }
  },
  getters: {
    getPackagesList() {
      return this.packagesList
    }
  },
  actions: {
  },
})