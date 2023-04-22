import cloneDeep from 'lodash/cloneDeep'
import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarCommonConfig } from './index'
import dataJson from './data.json'

// 从ECharts 的默认配置项里取出需要的部分,详见 `src/settings/chartThemes/index`
export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem = {
  type: 'bar',
  barWidth: 15,
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  itemStyle: {
    color: null,
    borderRadius: 2
  }
}
export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem]
}

// componentList 里面存储的都是 new Config() 这种对象（对象里面包含了要渲染的 echarts 组件的信息）
export default class Config extends PublicConfigClass {
  key = BarCommonConfig.key
  // chartConfig 就是隔壁 index.ts 里面导出的对象
  chartConfig = cloneDeep(BarCommonConfig)
  // 图表配置项  // 进行样式合并
  option = echartOptionProfixHandle(option, includes)
}