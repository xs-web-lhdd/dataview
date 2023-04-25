import { defineStore } from 'pinia'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum.js'
import { useChartEditStore } from '@/store/modules/chartEditStore/index.js'

export const ChartModeEnum = {
  SINGLE: 'single',
  DOUBLE: 'double'
}

export const LayerModeEnum = {
  THUMBNAIL: 'thumbnail',
  TEXT: 'text'
}

const chartEditStore = useChartEditStore()

const { GO_CHART_LAYOUT_STORE } = StorageEnum

const storageChartLayout = getLocalStorage(GO_CHART_LAYOUT_STORE)

// 编辑区域布局和静态设置
export const useChartLayoutStore = defineStore({
  id: 'useChartLayoutStore',
  state: () => ({
    // 图层控制
    layers: true,
    // 图表组件
    charts: true,
    // 详情设置（收缩为true）
    details: false,
    // 组件列表展示类型（默认单列）
    chartType: ChartModeEnum.SINGLE,
    // 图层类型（默认图片）
    layerType: LayerModeEnum.THUMBNAIL,
    // 当前加载数量
    percentage: 0,
    // 是否重置当前画布位置
    rePositionCanvas: false,
    // 防止值不存在
    ...storageChartLayout
  }),
  getters: {
    getLayers() {
      return this.layers
    },
    getCharts() {
      return this.charts
    },
    getDetails() {
      return this.details
    },
    getChartType() {
      return this.chartType
    },
    getLayerType() {
      return this.layerType
    },
    getPercentage() {
      return this.percentage
    },
    getRePositionCanvas() {
      return this.rePositionCanvas
    }
  },
  actions: {
    setItem(key, value) {
      this.$patch(state => {
        state[key] = value
      })
      // 存储本地
      setLocalStorage(GO_CHART_LAYOUT_STORE, this.$state)
      // 这里需要标记重置画布位置
      this.rePositionCanvas = true;
      // 重新计算拖拽区域缩放比例
      setTimeout(() => {
        chartEditStore.computedScale()
      }, 500)
    },
    setItemUnHandle(key, value) {
      this.$patch(state => {
        state[key] = value
      })
    }
  }
})
