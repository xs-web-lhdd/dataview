import { toRaw } from 'vue'
import { customizeHttp } from '@/api/http'
import { useChartEditStore } from '@/store/modules/chartEditStore/index.js'
import { newFunctionHandle, intervalUnitHandle } from '@/utils'

// 数据池 Map 中请求对应 callback
const mittDataPondMap = new Map()

// 创建单个数据项轮询接口
const newPondItemInterval = (
  requestGlobalConfig,
  requestDataPondItem,
  dataPondMapItem
) => {
  if (!dataPondMapItem) return
  let fetchInterval = 0

  clearInterval(fetchInterval)

  // 请求
  const fetchFn = async () => {
    try {
      const res = await customizeHttp(toRaw(requestDataPondItem.dataPondRequestConfig), toRaw(requestGlobalConfig))

      if (res) {
        try {
          // 遍历更新回调函数
          dataPondMapItem.forEach(item => {
            item.updateCallback(newFunctionHandle(res?.data, res, item.filter))
          })
        } catch (error) {
          console.error(error)
          return error
        }
      }
    } catch (error) {
      return error
    }
  }

  // 立即调用
  fetchFn()

  const targetInterval = requestDataPondItem.dataPondRequestConfig.requestInterval
  const targetUnit = requestDataPondItem.dataPondRequestConfig.requestIntervalUnit

  const globalRequestInterval = requestGlobalConfig.requestInterval
  const globalUnit = requestGlobalConfig.requestIntervalUnit

  // 定时时间
  const time = targetInterval  ? targetInterval : globalRequestInterval
  // 单位
  const unit = targetInterval  ? targetUnit : globalUnit
  // 开启轮询
  if (time) fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit))
}

/**
 * 数据池接口处理
 */
export const useChartDataPondFetch = () => {
  // 新增全局接口
  const addGlobalDataInterface = (
    targetComponent,
    useChartEditStore,
    updateCallback
  ) => {
    const chartEditStore = useChartEditStore()
    const { requestDataPond } = chartEditStore.getRequestGlobalConfig

    // 组件对应的数据池 Id
    const requestDataPondId = targetComponent.request.requestDataPondId
    // 新增数据项
    const mittPondIdArr = mittDataPondMap.get(requestDataPondId) || []
    mittPondIdArr.push({
      updateCallback: updateCallback,
      filter: targetComponent.filter
    })
    mittDataPondMap.set(requestDataPondId, mittPondIdArr)
  }

  // 清除旧数据
  const clearMittDataPondMap = () => {
    mittDataPondMap.clear()
  }

  // 初始化数据池
  const initDataPond = (requestGlobalConfig) => {
    const { requestDataPond } = requestGlobalConfig
    // 根据 mapId 查找对应的数据池配置
    for (let pondKey of mittDataPondMap.keys()) {
      const requestDataPondItem = requestDataPond.find(item => item.dataPondId === pondKey)
      if (requestDataPondItem) {
        newPondItemInterval(requestGlobalConfig, requestDataPondItem, mittDataPondMap.get(pondKey))
      }
    }
  }

  return {
    addGlobalDataInterface,
    clearMittDataPondMap,
    initDataPond
  }
}
