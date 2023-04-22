import Image_404 from '../assets/images/exception/image-404.png'

// * 开启加载
// export const loadingStart = () => {
//   window['$loading'].start()
// }

// * 加载结束
// export const loadingFinish = () => {
//   setTimeout(() => {
//     window['$loading'].finish()
//   })
// }

// * 加载错误
// export const loadingError = () => {
//   setTimeout(() => {
//     window['$loading'].error()
//   })
// }

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
  return Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36)
}

/**
 * * 获取错误处理图片，默认 404 图
 * @returns url
 */
export const requireErrorImg = () => {
  return Image_404
}

/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = (data) => {
  return JSON.stringify(
    data,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === 'function') {
        return `${val}`
      }
      // 处理 undefined 丢失问题
      if (typeof val === 'undefined') {
        return null
      }
      return val
    },
    2
  )
}