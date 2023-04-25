import { defineStore } from 'pinia'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum.js'

const { GO_SYSTEM_STORE } = StorageEnum

const storageSystem = getLocalStorage(GO_SYSTEM_STORE)

// 系统数据记录
export const useSystemStore = defineStore({
  id: 'useSystemStore',
  state: () => storageSystem || {
    userInfo: {
      userId: undefined,
      userName: undefined,
      userToken: undefined,
      nickName: undefined
    },
    fetchInfo: {
      OSSUrl: undefined
    }
  },
  getters: {
    getUserInfo() {
      return this.userInfo
    },
    getFetchInfo() {
      return this.fetchInfo
    },
  },
  actions: {
    setItem(key, value) {
      this.$patch(state => {
        state[key] = value
      });
      setLocalStorage(GO_SYSTEM_STORE, this.$state)
    },
    clearUserInfo() {
      this.userInfo = {
        userId: undefined,
        userName: undefined,
        userToken: undefined,
        nickName: undefined
      }
    }
  }
})