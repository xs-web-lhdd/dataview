export const HistoryActionTypeEnum = {
  // 新增
  ADD: 'add',
  // 删除
  DELETE: 'delete',
  // 更新（位置，属性）
  UPDATE: 'update',
  // 移动
  MOVE: 'move',
  // 复制
  COPY: 'copy',
  // 剪切
  CUT: 'cut',
  // 粘贴
  PASTE: 'paste',
  // 置顶
  TOP: 'top',
  // 置底
  BOTTOM: 'bottom',
  // 上移
  UP: 'up',
  // 下移
  DOWN: 'down',
  // 成组
  GROUP: 'group',
  // 解组
  UN_GROUP: 'unGroup',
  // 锁定
  LOCK: 'lock',
  // 解除锁定
  UNLOCK: 'unLock',
  // 隐藏
  HIDE: 'hide',
  // 显示
  SHOW: 'show'
}

// 对象类型
export const HistoryTargetTypeEnum = {
  CANVAS: 'canvas',
  CHART: 'chart'
}