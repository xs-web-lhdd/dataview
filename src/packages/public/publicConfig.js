import cloneDeep from 'lodash/cloneDeep'
import { getUUID } from '@/utils'
import { chartInitConfig } from '@/settings'

// 数据相关
const RequestDataTypeEnum = {
  // 静态数据
  STATIC: 0,
  // 请求数据
  AJAX: 1,
  // 数据池
  Pond: 2
}

// 请求间隔
const RequestHttpIntervalEnum = {
  // 秒
  SECOND: 'second',
  // 分
  MINUTE: 'minute',
  // 时
  HOUR: 'hour',
  // 天
  DAY: 'day'
}
// 请求方法
const RequestHttpEnum = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete'
}
// 请求主体类型
const RequestContentTypeEnum = {
  // 普通请求
  DEFAULT: 0,
  // SQL请求
  SQL: 1
}
// 请求头部类型
const RequestBodyEnum = {
  NONE: 'none',
  FORM_DATA: 'form-data',
  X_WWW_FORM_URLENCODED: 'x-www-form-urlencoded',
  JSON: 'json',
  XML: 'xml'
}

// 请求基础属性
export const requestConfig = {
  requestDataType: RequestDataTypeEnum.STATIC,
  requestHttpType: RequestHttpEnum.GET,
  requestUrl: '',
  requestInterval: undefined,
  requestIntervalUnit: RequestHttpIntervalEnum.SECOND,
  requestContentType: RequestContentTypeEnum.DEFAULT,
  requestParamsBodyType: RequestBodyEnum.NONE,
  requestSQLContent: {
    sql: 'select * from  where'
  },
  requestParams: {
    Body: {
      'form-data': {},
      'x-www-form-urlencoded': {},
      json: '',
      xml: ''
    },
    Header: {},
    Params: {}
  }
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

// vue3 生命周期事件
const EventLife = {
  // 渲染之后
  VNODE_MOUNTED: 'vnodeMounted',
  // 渲染之前
  VNODE_BEFORE_MOUNT: 'vnodeBeforeMount'
}

// 单实例类
export class PublicConfigClass {
  id = getUUID()
  isGroup = false
  // 基本信息
  attr = { ...chartInitConfig, zIndex: -1 }
  // 基本样式
  styles = {
    // 使用滤镜
    filterShow: false,
    // 色相
    hueRotate: 0,
    // 饱和度
    saturate: 1,
    // 对比度
    contrast: 1,
    // 亮度
    brightness: 1,
    // 透明
    opacity: 1,

    // 旋转
    rotateZ: 0,
    rotateX: 0,
    rotateY: 0,

    // 倾斜
    skewX: 0,
    skewY: 0,

    // 混合模式
    blendMode: 'normal',

    // 动画
    animations: []
  }
  // 预览
  preview = {
    overFlowHidden: false
  }
  // 状态
  status = {
    lock: false,
    hide: false
  }
  // 请求
  request = cloneDeep(requestConfig)
  // 数据过滤
  filter = undefined
  // 事件
  events = {
    baseEvent: {
      [BaseEvent.ON_CLICK]: undefined,
      [BaseEvent.ON_DBL_CLICK]: undefined,
      [BaseEvent.ON_MOUSE_ENTER]: undefined,
      [BaseEvent.ON_MOUSE_LEAVE]: undefined
    },
    advancedEvents: {
      [EventLife.VNODE_MOUNTED]: undefined,
      [EventLife.VNODE_BEFORE_MOUNT]: undefined
    }
  }
}
