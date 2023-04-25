import { cloneDeep } from 'lodash'
import router from '@/router/index.js'
import { RequestHttpIntervalEnum } from '@/enums/httpEnum.js'
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
 * * 获取本地会话数据
 * @param k 键名
 * @returns any
 */
export const getLocalStorage = (k) => {
  const item = window.localStorage.getItem(k)
  try {
    return item ? JSONParse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * * 存储本地会话数据
 * @param k 键名
 * @param v 键值（无需stringiiy）
 * @returns RemovableRef
 */
export const setLocalStorage = (k, v) => {
  try {
    window.localStorage.setItem(k, JSONStringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * 清除本地会话数据
 * @param name
 */
export const clearLocalStorage = (name) => {
  window.localStorage.removeItem(name)
}



/**
 * * 存储临时会话数据
 * @param k 键名
 * @param v 键值
 * @returns RemovableRef
 */
export const setSessionStorage = (k, v) => {
  try {
    window.sessionStorage.setItem(k, JSONStringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * 获取临时会话数据
 * @returns any
 */
export const getSessionStorage = (k) => {
  const item = window.sessionStorage.getItem(k)
  try {
    return item ? JSONParse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * * 根据名称获取路由信息
 * @param pageName
 * @param pageName
 */
export const fetchPathByName = (pageName, p) => {
  try {
    const pathData = router.resolve({
      name: pageName,
    })
    return p ? pathData[p] : pathData
  } catch (error) {
    console.log('fetchPathByName', error);
    window['$message'].warning('查询路由信息失败，请联系管理员！')
  }
}

/**
 * 修改元素位置
 * @param target 对象
 * @param x X轴
 * @param y Y轴
 */
export const setComponentPosition = (
  target,
  x,
  y
) => {
  x && (target.attr.x = x)
  y && (target.attr.y = y)
}

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

/**
 * * JSON反序列化，支持函数和 undefined
 * @param data
 */
export const JSONParse = (data) => {
  // vue3 生命周期事件
  const EventLife = {
    // 渲染之后
    VNODE_MOUNTED: 'vnodeMounted',
    // 渲染之前
    VNODE_BEFORE_MOUNT: 'vnodeBeforeMount'
  }

  // 基础事件类型(vue不加 on)
  const BaseEvent = {
    // 点击
    ON_CLICK: 'click',
    // 双击
    ON_DBL_CLICK: 'dblclick',
    // 移入
    ON_MOUSE_ENTER: 'mouseenter',
    // 移出
    ON_MOUSE_LEAVE: 'mouseleave'
  }

  // 内置字符串函数对象列表
  const excludeParseEventKeyList = [
    EventLife.VNODE_BEFORE_MOUNT,
    EventLife.VNODE_MOUNTED,
    BaseEvent.ON_CLICK,
    BaseEvent.ON_DBL_CLICK,
    BaseEvent.ON_MOUSE_ENTER,
    BaseEvent.ON_MOUSE_LEAVE,
    //过滤器
    'filter'
  ]

  // 内置字符串函数键值列表
  const excludeParseEventValueList = [
    // 请求里的函数语句
    'javascript:'
  ]

  return JSON.parse(data, (k, v) => {
    // 过滤函数字符串
    if (excludeParseEventKeyList.includes(k)) return v
    // 过滤函数值表达式
    if (typeof v === 'string') {
      const someValue = excludeParseEventValueList.some(excludeValue => v.indexOf(excludeValue) > -1)
      if (someValue) return v
    }
    // 还原函数值
    if (typeof v === 'string' && v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
      return eval(`(function(){return ${v}})()`)
    } else if (typeof v === 'string' && v.indexOf && v.indexOf('return ') > -1) {
      const baseLeftIndex = v.indexOf('(')
      if (baseLeftIndex > -1) {
        const newFn = `function ${v.substring(baseLeftIndex)}`
        return eval(`(function(){return ${newFn}})()`)
      }
    }
    return v
  })
}

/**
 * * 修改顶部标题
 * @param title
 */
export const setTitle = (title) => {
  title && (document.title = title)
}

/**
 * * 函数过滤器
 * @param data 数据值
 * @param res 返回顶级对象
 * @param funcStr 函数字符串
 * @param isToString 是否转为字符串
 * @param errorCallBack 错误回调函数
 * @param successCallBack 成功回调函数
 * @returns
 */
export const newFunctionHandle = (
  data,
  res,
  funcStr,
  isToString,
  errorCallBack,
  successCallBack
) => {
  try {
    if (!funcStr) return data
    const fn = new Function('data', 'res', funcStr)
    const fnRes = fn(cloneDeep(data), cloneDeep(res))
    const resHandle = isToString ? toString(fnRes) : fnRes
    // 成功回调
    successCallBack && successCallBack(resHandle)
    return resHandle
  } catch (error) {
    // 失败回调
    errorCallBack && errorCallBack(error)
    return '函数执行错误'
  }
}


/**
 * * 处理请求事件单位
 * @param num 时间间隔
 * @param unit RequestHttpIntervalEnum
 * @return number 秒数
 */
export const intervalUnitHandle = (num, unit) => {
  switch (unit) {
    // 秒
    case RequestHttpIntervalEnum.SECOND:
      return num * 1000
    // 分
    case RequestHttpIntervalEnum.MINUTE:
      return num * 1000 * 60
    // 时
    case RequestHttpIntervalEnum.HOUR:
      return num * 1000 * 60 * 60
    // 天
    case RequestHttpIntervalEnum.DAY:
      return num * 1000 * 60 * 60 * 24
    default:
      return num * 1000
  }
}
