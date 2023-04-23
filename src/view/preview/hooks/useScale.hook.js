import { ref, onMounted, onUnmounted} from 'vue'
import { usePreviewFitScale, usePreviewScrollYScale, usePreviewScrollXScale, usePreviewFullScale } from '@/hooks/index'
import { PreviewScaleEnum } from '@/enums/styleEnum'

export const useScale = (localStorageInfo) => {
  const entityRef = ref()
  const previewRef = ref()
  const width = ref(localStorageInfo.editCanvasConfig.width)
  const height = ref(localStorageInfo.editCanvasConfig.height)

  // 屏幕适配
  onMounted(() => {
    switch (localStorageInfo.editCanvasConfig.previewScaleType) {
      case PreviewScaleEnum.FIT: (() => {
        const { calcRate, windowResize, unWindowResize } = usePreviewFitScale(
          width.value,
          height.value,
          previewRef.value,
        )
        calcRate()
        windowResize()
        onUnmounted(() => {
          unWindowResize()
        })
      })()
        break;
      case PreviewScaleEnum.SCROLL_Y: (() => {
        const { calcRate, windowResize, unWindowResize } = usePreviewScrollYScale(
          width.value,
          height.value,
          previewRef.value,
          (scale) => {
            const dom = entityRef.value
            dom.style.width = `${width.value * scale.width}px`
            dom.style.height = `${height.value * scale.height}px`
          }
        )
        calcRate()
        windowResize()
        onUnmounted(() => {
          unWindowResize()
        })
      })()

        break;
      case PreviewScaleEnum.SCROLL_X: (() => {
        const { calcRate, windowResize, unWindowResize } = usePreviewScrollXScale(
          width.value,
          height.value,
          previewRef.value,
          (scale) => {
            const dom = entityRef.value
            dom.style.width = `${width.value * scale.width}px`
            dom.style.height = `${height.value * scale.height}px`
          }
        )
        calcRate()
        windowResize()
        onUnmounted(() => {
          unWindowResize()
        })
      })()

        break;
      case PreviewScaleEnum.FULL: (() => {
        const { calcRate, windowResize, unWindowResize } = usePreviewFullScale(
          width.value,
          height.value,
          previewRef.value,
        )
        calcRate()
        windowResize()
        onUnmounted(() => {
          unWindowResize()
        })
      })()
        break;
    }
  })

  return {
    entityRef,
    previewRef
  }
}
