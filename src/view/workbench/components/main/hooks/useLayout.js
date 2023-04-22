import { onUnmounted, onMounted } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/index.js'

const chartEditStore = useChartEditStore()

// 布局处理
export const useLayout = () => {
  onMounted(() => {
    // 设置 Dom 值(ref 不生效先用 document)
    //   EDIT_LAYOUT_DOM = 'editLayoutDom',
    // EDIT_CONTENT_DOM = 'editContentDom',
    chartEditStore.setEditCanvas(
      'editLayoutDom',
      document.getElementById('go-chart-edit-layout')
    )
    chartEditStore.setEditCanvas(
      'editContentDom',
      document.getElementById('go-chart-edit-content')
    )

    // 监听初始化
    const removeScale = chartEditStore.listenerScale()

    onUnmounted(() => {
      chartEditStore.setEditCanvas('editLayoutDom', null)
      chartEditStore.setEditCanvas('editContentDom', null)
      removeScale()
    })
  })
}