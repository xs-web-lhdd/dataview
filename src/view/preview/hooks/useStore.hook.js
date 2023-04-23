import { useChartEditStore } from '@/store/modules/chartEditStore/index.js'

// Store 枚举
const ChartEditStoreEnum =  {
  EDIT_RANGE: 'editRange',
  EDIT_CANVAS: 'editCanvas',
  RIGHT_MENU_SHOW: 'rightMenuShow',
  MOUSE_POSITION: 'mousePosition',
  TARGET_CHART: 'targetChart',
  RECORD_CHART: 'recordChart',
  // 以下需要存储
  EDIT_CANVAS_CONFIG: 'editCanvasConfig',
  REQUEST_GLOBAL_CONFIG: 'requestGlobalConfig',
  COMPONENT_LIST: 'componentList'
}
// store 相关
export const useStore = (localStorageInfo) => {
  const chartEditStore = useChartEditStore()
  chartEditStore.requestGlobalConfig = localStorageInfo[ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG]
}
