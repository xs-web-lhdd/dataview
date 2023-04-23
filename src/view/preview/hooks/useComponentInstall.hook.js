import { ref } from 'vue'
import { fetchChartComponent } from '@/packages/index'

/**
 * 将 conponentList 中全部的对象信息注册成组件，绑定到 window.vue 上面
 * @param localStorageInfo localStorage存储当前预览页内所有的信息
 * @returns 是否展示
 */
export const useComInstall = (localStorageInfo) => {
  const show = ref(false)

  // 注册组件(一开始无法获取window['$vue'])
  const intervalTiming = setInterval(() => {
    if (window['$vue'].component) {
      clearInterval(intervalTiming)

      const intComponent = (target) => {
        if (!window['$vue'].component(target.chartConfig.chartKey)) {
          window['$vue'].component(target.chartConfig.chartKey, fetchChartComponent(target.chartConfig))
        }
      }

      localStorageInfo.componentList.forEach(async (e) => {
        if (e.isGroup) {
          (e).groupList.forEach(groupItem => {
            intComponent(groupItem)
          })
        } else {
          intComponent(e)
        }
      })
      show.value = true
    }
  }, 200)

  return {
    show
  }
}
