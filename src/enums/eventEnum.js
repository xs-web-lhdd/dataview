// vue3 生命周期事件
export const EventLife = {
  // 渲染之后
  VNODE_MOUNTED: 'vnodeMounted',
  // 渲染之前
  VNODE_BEFORE_MOUNT: 'vnodeBeforeMount'
}

// 基础事件类型(vue不加 on)
export const BaseEvent = {
  // 点击
  ON_CLICK: 'click',
  // 双击
  ON_DBL_CLICK: 'dblclick',
  // 移入
  ON_MOUSE_ENTER: 'mouseenter',
  // 移出
  ON_MOUSE_LEAVE: 'mouseleave'
}