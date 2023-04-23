// 设置位置
export const getComponentAttrStyle = (attr, index) => {
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
  }
  return componentStyle
}

// 设置大小
export const getSizeStyle = (attr, scale ) => {
  return {
    width: `${scale ? scale * attr.w : attr.w}px`,
    height: `${scale ? scale * attr.h : attr.h}px`
  }
}

// 设置状态样式
export const getStatusStyle = (attr) => {
  return {
    display: attr.hide ? 'none' : 'block'
  }
}

// 设置预览配置样式
export const getPreviewConfigStyle = (previewConfig) => {
  const previewStyle = {}
  if (previewConfig) {
    if (previewConfig.overFlowHidden) {
      previewStyle.overflow = 'hidden'
    }
  }
  return previewStyle
}

// 全局样式
export const getEditCanvasConfigStyle = (canvas) => {
  // 背景
  const computedBackground = canvas.selectColor
    ? { background: canvas.background }
    : {
        background: `url(${canvas.backgroundImage}) center center / cover no-repeat !important`
      }
  return {
    position: 'relative',
    width: canvas.width ? `${canvas.width || 100}px` : '100%',
    height: canvas.height ? `${canvas.height}px` : '100%',
    ...computedBackground
  }
}
