import { PublicConfigClass } from '@/packages/public'
import { chartInitConfig } from '@/settings/designSetting'
import { IframeConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 网站路径
  dataset: "https://www.baidu.com/",
  // 圆角
  borderRadius: 10
}

export default class Config extends PublicConfigClass {
  key = IframeConfig.key
  attr = { ...chartInitConfig, w: 1200, h: 800, zIndex: -1 }
  chartConfig = cloneDeep(IframeConfig)
  option = cloneDeep(option)
}
