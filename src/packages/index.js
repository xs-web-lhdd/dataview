import { ChartList } from "./components/Charts"
import { InformationList } from './components/Informations'
import { TableList } from './components/Tables'
import { DecorateList } from './components/Decorates'

// 使用 vite 中的 import.meta.globEager 获得 ./components/ 路径下所有名字是 config.vue 的文件
const configModules = import.meta.globEager('./components/**/config.vue')
const indexModules = import.meta.globEager('./components/**/index.vue')
const imagesModules = import.meta.globEager('../assets/packages/**')



// * 所有拖拽图表的信息列表
export const packagesList = {
  Charts: ChartList,
  Informations: InformationList,
  Tables: TableList,
  Decorates: DecorateList
}


/**
 * * 获取目标组件配置信息
 * @param targetData
 */
export const createComponent = async (targetData) => {
  const { category, key } = targetData
  const chart = await import(`./components/${targetData.package}/${category}/${key}/config.js`)
  return new chart.default()
}

/**
 * * 获取组件
 * @param {string} chartName 名称
 * @param {FetchComFlagType} flag 标识 0为展示组件, 1为配置组件
 */
const fetchComponent = (chartName, flag) => {
  const module = flag === 'view' ? indexModules : configModules
  for (const key in module) {
    const urlSplit = key.split('/')
    // 根据特定位置截取出 module 中每个文件的名字,然后与拖动的图标名字想比较,如果一致就返回对应组件
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return module[key]
    }
  }
}

/**
 * * 获取展示组件
 * @param {ConfigType} dropData 配置项
 */
export const fetchChartComponent = (dropData) => {
  const { key } = dropData
  // 给 fetchComponent 传入 FetchComFlagType.VIEW 用以 fetchComponent 来区分是展示组件还是配置组件(VIEW 是展示.CONFIG 是配置)
  return fetchComponent(key, "view")?.default
}

/**
 * * 获取配置组件
 * @param {ConfigType} dropData 配置项
 */
export const fetchConfigComponent = (dropData) => {
  const { key } = dropData
  return fetchComponent(key, 'config')?.default
}


/**
 * * 获取图片内容
 * @param {ConfigType} targetData 配置项
 */
export const fetchImages = async (targetData) => {
  // console.log('targetData', targetData);
  if (!targetData) return ''
  // 新数据动态处理
  const { image } = targetData
  // 兼容旧数据
  if (image.includes('@') || image.includes('base64')) return image

  const imageName = image.substring(image.lastIndexOf('/') + 1)
  for (const key in imagesModules) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 1] === imageName) {
      return imagesModules[key]?.default
    }
  }
  return ''
}