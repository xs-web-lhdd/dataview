import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { globalThemeJson } from '@/settings/index'

/**
 * * 合并 color 和全局配置项
 * @param option 配置
 * @param themeSetting 设置
 * @param excludes 排除元素
 * @returns object
 */
export const mergeTheme = (option, themeSetting, includes) => {
  return (option = merge({}, pick(themeSetting, includes), option))
}

/**
 * * ECharts option 统一前置处理
 * @param option
 * @return option
 */
export const echartOptionProfixHandle = (option, includes) => {
  option['backgroundColor'] = 'rgba(0,0,0,0)'
  return mergeTheme(option, globalThemeJson, includes)
}