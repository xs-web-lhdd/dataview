/**
 * * 合并基础颜色和自定义颜色
 * @param chartDefaultColors
 * @param customColor
 * @returns
 */
export const colorCustomMerge = (customColor) => {
  const formateCustomColor = {}
  customColor?.forEach(item => {
    formateCustomColor[item.id] = {
      color: item.color,
      name: item.name
    }
  })
  // TODO: 小 bug，日后解决
  // return { ...formateCustomColor, ...chartColors }
  return { ...formateCustomColor }
}

// * 动画
export const animationsClass = (animations) => {
  if (animations.length) {
    return `animate__animated  animate__${animations[0]}`
  }
  return ''
}


// * 混合模式
export const getBlendModeStyle = (styles) => {
  if (!styles || !styles.filterShow) return {}
  const { blendMode } = styles
  return {
    'mix-blend-mode': blendMode
  }
}


// * 滤镜
export const getFilterStyle = (styles) => {
  if (!styles || !styles.filterShow) return {}
  const { opacity, saturate, contrast, hueRotate, brightness } = styles
  return {
    opacity: opacity,
    filter: `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`
  }
}


// * 变换
export const getTransformStyle = (styles) => {
  const { rotateZ, rotateX, rotateY, skewX, skewY } = styles
  return {
    transform: `rotateZ(${rotateZ || 0}deg) rotateX(${rotateX || 0}deg) rotateY(${rotateY || 0}deg) skewX(${
      skewX || 0
    }deg) skewY(${skewY || 0}deg)`
  }
}