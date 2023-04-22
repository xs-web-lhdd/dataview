import { defineStore } from 'pinia'

export const useCounterStore = defineStore('userinfo', {
  state: () => {
    return { count: 0 }
  },
  // 也可以定义为
  actions: {
    increment() {
      this.count++
    },
  },
})