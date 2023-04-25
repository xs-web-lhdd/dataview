// 主题配置
export const theme = {
  // 默认是否开启深色主题
  darkTheme: true,
  //默认主题色
  appTheme: '#409EFF',
  // appTheme: 'red',
  appThemeDetail: null,
}

// 图表初始配置(px)
export const chartInitConfig = {
  x: 50,
  y: 50,
  w: 500,
  h: 300,
  // 不建议动 offset
  offsetX: 0,
  offsetY: 0,
}

// 数据请求间隔
export const requestInterval = 30

// 数据请求间隔单位
export const requestIntervalUnit = 'second'

// 工作台大屏背景图片大小限制（5M）
export const backgroundImageSize = 5

// 拖拽时蒙层的 z-index，需比所有图表高
export const canvasModelIndex = 9999

// 框选时蒙层的 z-index，需比所有图表高
export const selectBoxIndex = canvasModelIndex + 10