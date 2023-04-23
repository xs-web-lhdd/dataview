import { EventLife } from '@/enums/eventEnum'
import * as echarts from 'echarts'

// 所有图表组件集合对象
const components = {}

// 项目提供的npm 包变量
export const npmPkgs = { echarts }

// 组件事件处理 hook
export const useLifeHandler = (chartConfig) => {
  if (!chartConfig.events) return {}

  // 处理基础事件
  const baseEvent = {}
  for (const key in chartConfig.events.baseEvent) {
    const fnStr = (chartConfig.events.baseEvent)[key]
    // 动态绑定基础事件
    if (fnStr) {
      baseEvent[key] = generateBaseFunc(fnStr)
    }
  }

  // 生成生命周期事件
  const events = chartConfig.events.advancedEvents || {}
  const lifeEvents = {
    [EventLife.VNODE_BEFORE_MOUNT](e) {
      // 存储组件
      components[chartConfig.id] = e.component
      const fnStr = (events[EventLife.VNODE_BEFORE_MOUNT] || '').trim()
      generateFunc(fnStr, e)
    },
    [EventLife.VNODE_MOUNTED](e) {
      const fnStr = (events[EventLife.VNODE_MOUNTED] || '').trim()
      generateFunc(fnStr, e)
    }
  }
  return { ...baseEvent, ...lifeEvents }
}

/**
 * 生成基础函数
 * @param fnStr 用户方法体代码
 * @param event 鼠标事件
 */
 export function generateBaseFunc(fnStr) {
  try {
    return new Function(`
      return (
        async function(mouseEvent){
          ${fnStr}
        }
      )`)()
  } catch (error) {
    console.error(error)
  }
}

/**
 * 生成高级函数
 * @param fnStr 用户方法体代码
 * @param e 执行生命周期的动态组件实例
 */
function generateFunc(fnStr, e) {
  try {
    // npmPkgs 便于拷贝 echarts 示例时设置option 的formatter等相关内容
    Function(`
      "use strict";
      return (
        async function(e, components, node_modules){
          const {${Object.keys(npmPkgs).join()}} = node_modules;
          ${fnStr}
        }
      )`)().bind(e?.component)(e, components, npmPkgs)
  } catch (error) {
    console.error(error)
  }
}
