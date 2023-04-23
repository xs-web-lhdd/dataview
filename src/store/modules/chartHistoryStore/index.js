import { defineStore } from 'pinia'

const HistoryActionTypeEnum = {
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
const HistoryTargetTypeEnum = {
  CANVAS: 'canvas',
  CHART: 'chart'
}

const editHistoryMax = 100

export const useChartHistoryStore = defineStore('useChartHistoryStore', {
  id: 'useChartHistoryStore',
  state: () => {
    return {
      // 后退栈
      backStack: [],
      // 前进栈
      forwardStack: []
    }
  },
  getters: {
  },
  actions: {
    /**
     * * 新增记录并插入栈
     * @param item 图表实例
     * @param actionType 动作类型
     * @param targetType 对象类型（默认图表）
     */
    createStackItem(
      item,
      actionType,
      targetType
    ) {
      const HistoryStackItemEnum = {
        ID: 'id',
        TARGET_TYPE: 'targetType',
        ACTION_TYPE: 'actionType',
        HISTORY_DATA: 'historyData'
      }
      // 优化性能转为 freeze
      this.pushBackStackItem(
        Object.freeze({
          [HistoryStackItemEnum.ID]: new Date().getTime().toString(),
          [HistoryStackItemEnum.HISTORY_DATA]: item,
          [HistoryStackItemEnum.ACTION_TYPE]: actionType,
          [HistoryStackItemEnum.TARGET_TYPE]: targetType
        })
      )
    },
    // * 改变层级组件记录
    createLayerHistory(item, type) {
      this.createStackItem(item, type, HistoryTargetTypeEnum.CHART)
    },
    // * 锁定记录
    createLockHistory(item) {
      this.createStackItem(item, HistoryActionTypeEnum.LOCK, HistoryTargetTypeEnum.CHART)
    },
    // * 解锁记录
    createUnLockHistory(item) {
      this.createStackItem(item, HistoryActionTypeEnum.UNLOCK, HistoryTargetTypeEnum.CHART)
    },
    // * 解除分组
    createUnGroupHistory(item) {
      this.createStackItem(item, HistoryActionTypeEnum.UN_GROUP, HistoryTargetTypeEnum.CHART)
    },
    // * 推入后退栈
    pushBackStackItem(item, notClear = false) {
      if (item instanceof Array) this.backStack = [...this.backStack, ...item]
      else this.backStack.push(item)
      this.backStack.splice(0, this.backStack.length - editHistoryMax)
      // 新动作需清空前进栈
      if (notClear) return
      this.clearForwardStack()
    },
    // * 移动组件记录
    createMoveHistory(item) {
      this.createStackItem(item, HistoryActionTypeEnum.MOVE, HistoryTargetTypeEnum.CHART)
    },
    // * 删除组件记录
    createDeleteHistory(item) {
      this.createStackItem(item, HistoryActionTypeEnum.DELETE, HistoryTargetTypeEnum.CHART)
    },
    // * 清空前进栈
    clearForwardStack() {
      this.forwardStack = []
    },
    // * 隐藏记录
    createHideHistory(item) {
      this.createStackItem(item, HistoryActionTypeEnum.HIDE, HistoryTargetTypeEnum.CHART)
    },
    // * 展示记录
    createShowHistory(item) {
      this.createStackItem(item, HistoryActionTypeEnum.SHOW, HistoryTargetTypeEnum.CHART)
    }
  },
})