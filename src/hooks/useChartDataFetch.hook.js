import { ref, toRaw, toRefs } from "vue"
// import { useChartEditStore } from '@/store/modules/useChartEditStore/index.js'
import { useChartDataPondFetch } from '@/hooks'
import { isPreview } from '@/utils'

// 数据相关
export const RequestDataTypeEnum = {
  // 静态数据
  STATIC: 0,
  // 请求数据
  AJAX: 1,
  // 数据池
  Pond: 2
}

/**
 * setdata 数据监听与更改
 * @param targetComponent
 * @param useChartEditStore 若直接引会报错，只能动态传递
 * @param updateCallback 自定义更新函数
 */
export const useChartDataFetch = (
  targetComponent,
  useChartEditStore,
  updateCallback
) => {
  const vChartRef = ref(null)
  let fetchInterval

  // 数据池
  const { addGlobalDataInterface } = useChartDataPondFetch()

  // 组件类型
  const { chartFrame } = targetComponent.chartConfig

  // eCharts 组件配合 vChart 库更新方式
  const echartsUpdateHandle = (dataset) => {
    if (chartFrame === ChartFrameEnum.ECHARTS) {
      if (vChartRef.value) {
        setOption(vChartRef.value, { dataset: dataset })
      }
    }
  }

  const requestIntervalFn = () => {
    const chartEditStore = useChartEditStore()

    // 全局数据
    const {
      requestOriginUrl,
      requestIntervalUnit: globalUnit,
      requestInterval: globalRequestInterval
    } = toRefs(chartEditStore.getRequestGlobalConfig)

    // 目标组件
    const {
      requestDataType,
      requestUrl,
      requestIntervalUnit: targetUnit,
      requestInterval: targetInterval
    } = toRefs(targetComponent.request)

    // 非请求类型
    if (requestDataType.value !== RequestDataTypeEnum.AJAX) return

    try {
      // 处理地址
      // @ts-ignore
      if (requestUrl?.value) {
        // requestOriginUrl 允许为空
        const completePath = requestOriginUrl && requestOriginUrl.value + requestUrl.value
        if (!completePath) return

        clearInterval(fetchInterval)

        const fetchFn = async () => {
          const res = await customizeHttp(toRaw(targetComponent.request), toRaw(chartEditStore.getRequestGlobalConfig))
          if (res) {
            try {
              const filter = targetComponent.filter
              echartsUpdateHandle(newFunctionHandle(res?.data, res, filter))
              // 更新回调函数
              if (updateCallback) {
                updateCallback(newFunctionHandle(res?.data, res, filter))
              }
            } catch (error) {
              console.error(error)
            }
          }
        }

        // 立即调用
        fetchFn()
        // 定时时间
        const time = targetInterval && targetInterval.value ? targetInterval.value : globalRequestInterval.value
        // 单位
        const unit = targetInterval && targetInterval.value ? targetUnit.value : globalUnit.value
        // 开启轮询
        if (time) fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit))
      }
      // eslint-disable-next-line no-empty
    } catch (error) {
      console.log(error)
    }
  }

  if (isPreview()) {
    // 判断是否是数据池类型
    targetComponent.request.requestDataType === RequestDataTypeEnum.Pond
      ? addGlobalDataInterface(targetComponent, useChartEditStore, updateCallback || echartsUpdateHandle)
      : requestIntervalFn()
  }
  return { vChartRef }
}
