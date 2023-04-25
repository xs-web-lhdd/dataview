import { ref, nextTick, toRaw } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/index.js'
import cloneDeep from 'lodash/cloneDeep'
import { MenuEnum } from "@/enums/editPageEnum.js";


const chartEditStore = useChartEditStore()


// * 默认单组件选项
export const defaultOptions = [
  {
    label: '锁定',
    key: MenuEnum.LOCK,
    // TODO: 添加 icon 属性
    fnHandle: chartEditStore.setLock
  },
  {
    label: '解锁',
    key: MenuEnum.UNLOCK,
    fnHandle: chartEditStore.setUnLock
  },
  {
    label: '隐藏',
    key: MenuEnum.HIDE,
    fnHandle: chartEditStore.setHide
  },
  {
    label: '显示',
    key: MenuEnum.SHOW,
    fnHandle: chartEditStore.setShow
  },
  {
    label: '复制',
    key: MenuEnum.COPY,
    fnHandle: chartEditStore.setCopy
  },
  {
    label: '剪切',
    key: MenuEnum.CUT,
    fnHandle: chartEditStore.setCut
  },
  {
    label: '粘贴',
    key: MenuEnum.PARSE,
    fnHandle: chartEditStore.setParse
  },
  {
    label: '置顶',
    key: MenuEnum.TOP,
    fnHandle: chartEditStore.setTop
  },
  {
    label: '置底',
    key: MenuEnum.BOTTOM,
    fnHandle: chartEditStore.setBottom
  },
  {
    label: '上移',
    key: MenuEnum.UP,
    fnHandle: chartEditStore.setUp
  },
  {
    label: '下移',
    key: MenuEnum.DOWN,
    fnHandle: chartEditStore.setDown
  },
  {
    label: '清空剪贴板',
    key: MenuEnum.CLEAR,
    fnHandle: chartEditStore.setRecordChart
  },
  {
    label: '删除',
    key: MenuEnum.DELETE,
    fnHandle: chartEditStore.removeComponentList
  }
]

// * 默认多选组件选项
export const defaultMultiSelectOptions = [
  {
    label: '创建分组',
    key: MenuEnum.GROUP,
    fnHandle: chartEditStore.setGroup
  },
  {
    label: '解除分组',
    key: MenuEnum.UN_GROUP,
    fnHandle: chartEditStore.setUnGroup
  }
]

// * 无数据传递拥有的选项
const defaultNoItemKeys = [MenuEnum.PARSE, MenuEnum.CLEAR]

/**
 * * 挑选选项
 * @param options
 * @param pickList
 * @returns
 */
const pickOption = (options, pickList) => {
  if (!pickList) return options
  const list = []
  pickList.forEach(e => {
    list.push(...options.filter(op => op.key === e))
  })
  return list
}

/**
 * * 去除选项
 * @param options
 * @param hideList
 * @returns
 */
const hideOption = (options, hideList) => {
  if (!hideList) return options
  return options.filter((op) => {
    return hideList.findIndex(e => e !== op.key) !== -1
  })
}

// * 右键内容
const menuOptions = ref([])

// * 右键处理
const handleContextMenu = (
  e,
  // 右键对象
  targetInstance,
  // 判断函数
  optionsHandle,
  // 隐藏选项列表
  hideOptionsList,
  // 挑选选项列表
  pickOptionsList
) => {
  e.stopPropagation()
  e.preventDefault()

  // console.log('---->>>>', '右键处理');

  let target = e.target
  while (target instanceof SVGElement) {
    target = target.parentNode
  }

  chartEditStore.setTargetSelectChart(targetInstance && targetInstance.id)

  // 隐藏旧列表
  chartEditStore.setRightMenuShow(false)

  // * 多选默认选项
  if (chartEditStore.getTargetChart.selectId.length > 1) {
    menuOptions.value = defaultMultiSelectOptions
  } else {
    // * 单选默认选项
    menuOptions.value = defaultOptions
  }

  if (!targetInstance) {
    menuOptions.value = pickOption(toRaw(menuOptions.value), defaultNoItemKeys)
  }
  if (hideOptionsList) {
    menuOptions.value = hideOption([...defaultMultiSelectOptions, ...defaultOptions], hideOptionsList)
  }
  if (pickOptionsList) {
    menuOptions.value = pickOption([...defaultMultiSelectOptions, ...defaultOptions], pickOptionsList)
  }
  if (optionsHandle) {
    // 自定义函数能够拿到当前选项和所有选项
    menuOptions.value = optionsHandle(
      cloneDeep(toRaw(menuOptions.value)),
      [...defaultMultiSelectOptions, ...defaultOptions],
      targetInstance
    )
  }
  nextTick().then(() => {
    chartEditStore.setMousePosition(e.clientX, e.clientY)
    chartEditStore.setRightMenuShow(true)
  })
}

/**
 * * 右键hook
 * @param menuConfig
 * @returns
 */
export const useContextMenu = () => {
  // 设置默认项
  menuOptions.value = defaultOptions

  // * 失焦
  const onClickOutSide = () => {
    chartEditStore.setRightMenuShow(false)
  }

  // * 事件处理
  const handleMenuSelect = (key) => {
    chartEditStore.setRightMenuShow(false)
    const targetItem = menuOptions.value.filter((e) => e.key === key)

    menuOptions.value.forEach((e) => {
      if (e.key === key) {
        if (e.fnHandle) {
          e.fnHandle()
          return
        }
        if (!targetItem) {
          // TODO: 加载出错：
        }
      }
    })
  }

  return {
    menuOptions,
    defaultOptions,
    defaultMultiSelectOptions,
    handleContextMenu,
    onClickOutSide,
    handleMenuSelect,
    mousePosition: chartEditStore.getMousePosition
  }
}
