import { PublicConfigClass } from '@/packages/public'
import { TextBarrageConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const FontWeightEnum = {
  NORMAL: '常规',
  BOLD: '加粗',
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export const option = {
  dataset: '让数字化看得见',
  fontSize: 32,
  fontColor: '#ffffff',
  fontWeight: 'normal',
  // 字间距
  letterSpacing: 5,
  //阴影
  showShadow:  true,
  boxShadow: 'none',
  hShadow: 0,
  vShadow: 0,
  blurShadow: 8,
  colorShadow: '#0075ff',
  //动画
  animationTime: 0,
  animationSpeed: 50,
}

export default class Config extends PublicConfigClass {
  key = TextBarrageConfig.key
  attr = { ...chartInitConfig, w: 500, h: 70, zIndex: -1 }
  chartConfig = cloneDeep(TextBarrageConfig)
  option = cloneDeep(option)
  preview = { overFlowHidden: true } 
}
