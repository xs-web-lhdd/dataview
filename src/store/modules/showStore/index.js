import { defineStore } from 'pinia'

// 工作台展开栏设置
export const useShowStore = defineStore('showList', {
  state: () => {
    return {
      chartsShow: true,
      chartsWidth: '260px',
      layersShow: true,
      layersWidth: '200px',
      configurationShow: true,
      configurationWidth: '350px'
    }
  },
  // 也可以定义为
  actions: {
    changeCharts() {
      this.chartsShow = !this.chartsShow
      if(this.chartsShow) this.chartsWidth = '260px'
      else this.chartsWidth = '0px'
    },
    changeLayers() {
      this.layersShow = !this.layersShow
      if(this.layersShow) this.layersWidth = '200px'
      else this.layersWidth = '0px'
    },
    changeConfiguration() {
      this.configurationShow = !this.configurationShow
      if(this.configurationShow) this.configurationWidth = '350px'
      else this.configurationWidth = '0px'
    }
  },
})