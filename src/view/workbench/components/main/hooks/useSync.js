import { onUnmounted } from 'vue';
import html2canvas from 'html2canvas'
import { getUUID, httpErrorHandle, fetchRouteParamsLocation, base64toFile, JSONStringify, JSONParse } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/index.js'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/index.js'
import { useSystemStore } from '@/store/modules/systemStore/index.js'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/index.js'
import { fetchChartComponent, fetchConfigComponent, createComponent } from '@/packages/index'
import { saveInterval } from '@/settings/designSetting'
import { throttle, merge } from 'lodash'
// 接口状态
import { ResultEnum } from '@/enums/httpEnum.js'
// 接口
// import { saveProjectApi, fetchProjectApi, uploadFile, updateProjectApi } from '@/api/index.js'
import $Api from '@/api/index.js'
// 画布枚举
import { SyncEnum } from '@/enums/editPageEnum.js'
import { BaseEvent, EventLife } from '@/enums/eventEnum.js'
import { PublicGroupConfigClass } from '@/packages/public/publicConfig'


// 编辑画布属性
export const EditCanvasTypeEnum = {
  EDIT_LAYOUT_DOM: 'editLayoutDom',
  EDIT_CONTENT_DOM: 'editContentDom',
  OFFSET: 'offset',
  SCALE: 'scale',
  USER_SCALE: 'userScale',
  LOCK_SCALE: 'lockScale',
  SAVE_STATUS: 'saveStatus',
  IS_CREATE: 'isCreate',
  IS_DRAG: 'isDrag',
  IS_SELECT: 'isSelect',
  IS_CODE_EDIT: "isCodeEdit"
}

// Store 枚举
export const ChartEditStoreEnum = {
  PROJECT_INFO: 'projectInfo',
  EDIT_RANGE: 'editRange',
  EDIT_CANVAS: 'editCanvas',
  RIGHT_MENU_SHOW: 'rightMenuShow',
  MOUSE_POSITION: 'mousePosition',
  TARGET_CHART: 'targetChart',
  RECORD_CHART: 'recordChart',
  // 以下需要存储
  EDIT_CANVAS_CONFIG: 'editCanvasConfig',
  REQUEST_GLOBAL_CONFIG: 'requestGlobalConfig',
  COMPONENT_LIST: 'componentList'
}

// 项目数据枚举
export const ProjectInfoEnum = {
  // ID
  PROJECT_ID: "projectId",
  // 名称
  PROJECT_NAME: 'projectName',
  // 描述
  REMARKS: 'remarks',
  // 缩略图
  THUMBNAIL: 'thumbnail',
  // 是否公开发布
  RELEASE: 'release'
}

export const ChartLayoutStoreEnum = {
  LAYERS: 'layers',
  CHARTS: 'charts',
  DETAILS: 'details',
  Chart_TYPE: 'chartType',
  LAYER_TYPE: 'layerType',
  PERCENTAGE: 'percentage',
  RE_POSITION_CANVAS: 'rePositionCanvas'
}

/**
 * * 画布-版本升级对旧数据无法兼容的补丁
 * @param object
 */
const canvasVersionUpdatePolyfill = (object) => {
  return object
}

/**
 * * 组件-版本升级对旧数据无法兼容的补丁
 * @param newObject
 * @param sources
 */
const componentVersionUpdatePolyfill = (newObject, sources) => {
  try {
    // 判断是否是组件
    if (sources.id) {
      // 处理事件补丁
      const hasVnodeBeforeMount = 'vnodeBeforeMount' in sources.events
      const hasVnodeMounted = 'vnodeMounted' in sources.events

      if (hasVnodeBeforeMount) {
        newObject.events.advancedEvents.vnodeBeforeMount = sources?.events.vnodeBeforeMount
      }
      if (hasVnodeMounted) {
        newObject.events.advancedEvents.vnodeMounted = sources?.events.vnodeMounted
      }
      if (hasVnodeBeforeMount || hasVnodeMounted) {
        sources.events = {
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
      return newObject
    }
  } catch (error) {
    return newObject
  }
}

/**
 * * 合并处理
 * @param newObject 新的模板数据
 * @param sources 新拿到的数据
 * @returns object
 */
const componentMerge = (newObject, sources, notComponent = false) => {
  // 处理组件补丁
  componentVersionUpdatePolyfill(newObject, sources)

  // 非组件不处理
  if (notComponent) return merge(newObject, sources)
  // 组件排除 newObject
  const option = sources.option
  if (!option) return merge(newObject, sources)

  // 为 undefined 的 sources 来源对象属性将被跳过详见 https://www.lodashjs.com/docs/lodash.merge
  sources.option = undefined
  if (option) {
    return {
      ...merge(newObject, sources),
      option: option
    }
  }
}

// 请求处理
export const useSync = () => {
  const chartEditStore = useChartEditStore()
  const chartHistoryStore = useChartHistoryStore()
  const systemStore = useSystemStore()
  const chartLayoutStore = useChartLayoutStore()
  /**
   * * 组件动态注册
   * @param projectData 项目数据
   * @param isReplace 是否替换数据
   * @returns
   */
  const updateComponent = async (projectData, isReplace = false, changeId = false) => {
    if (isReplace) {
      // 清除列表
      chartEditStore.componentList = []
      // 清除历史记录
      chartHistoryStore.clearBackStack()
      chartHistoryStore.clearForwardStack()
    }
    // 画布补丁处理
    projectData.editCanvasConfig = canvasVersionUpdatePolyfill(projectData.editCanvasConfig)

    // 列表组件注册
    projectData?.componentList?.forEach(async (e) => {
      const intComponent = (target) => {
        if (!window['$vue'].component(target.chartConfig.chartKey)) {
          window['$vue'].component(target.chartConfig.chartKey, fetchChartComponent(target.chartConfig))
          window['$vue'].component(target.chartConfig.conKey, fetchConfigComponent(target.chartConfig))
        }
      }

      if (e.isGroup) {
        e.groupList.forEach(groupItem => {
          intComponent(groupItem)
        })
      } else {
        intComponent(e)
      }
    })

    // 创建函数-重新创建是为了处理类种方法消失的问题
    const create = async (
      _componentInstance,
      callBack
    ) => {
      // 补充 class 上的方法
      let newComponent = await createComponent(_componentInstance.chartConfig)
      if (callBack) {
        if (changeId) {
          callBack(componentMerge(newComponent, { ..._componentInstance, id: getUUID() }))
        } else {
          callBack(componentMerge(newComponent, _componentInstance))
        }
      } else {
        if (changeId) {
          chartEditStore.addComponentList(
            componentMerge(newComponent, { ..._componentInstance, id: getUUID() }),
            false,
            true
          )
        } else {
          chartEditStore.addComponentList(componentMerge(newComponent, _componentInstance), false, true)
        }
      }
    }

    // 数据赋值
    for (const key in projectData) {
      // 组件
      if (key === ChartEditStoreEnum.COMPONENT_LIST) {
        let loadIndex = 0
        const listLength = projectData[key].length;
        for (const comItem of projectData[key]) {
          // 设置加载数量
          let percentage = parseInt((parseFloat(`${++loadIndex / listLength}`) * 100).toString())
          chartLayoutStore.setItemUnHandle(ChartLayoutStoreEnum.PERCENTAGE, percentage)
          // 判断类型
          if (comItem.isGroup) {
            // 创建分组
            let groupClass = new PublicGroupConfigClass()
            if (changeId) {
              groupClass = componentMerge(groupClass, { ...comItem, id: getUUID() })
            } else {
              groupClass = componentMerge(groupClass, comItem)
            }

            // 异步注册子应用
            const targetList = []
            for (const groupItem of comItem.groupList) {
              await create(groupItem, e => {
                targetList.push(e)
              })
            }
            groupClass.groupList = targetList

            // 分组插入到列表
            chartEditStore.addComponentList(groupClass, false, true)
          } else {
            await create(comItem)
          }
        }
      } else {
        // 非组件(顺便排除脏数据)
        if (key !== 'editCanvasConfig' && key !== 'requestGlobalConfig') return
        componentMerge(chartEditStore[key], projectData[key], true)
      }
    }

    // 清除数量
    chartLayoutStore.setItemUnHandle(ChartLayoutStoreEnum.PERCENTAGE, 0)
  }

  /**
   * * 赋值全局数据
   * @param projectData 项目数据
   * @returns
   */
  const updateStoreInfo = (projectData) => {
    const { id, projectName, remarks, indexImage, state } = projectData
    // ID
    chartEditStore.setProjectInfo(ProjectInfoEnum.PROJECT_ID, id)
    // 名称
    chartEditStore.setProjectInfo(ProjectInfoEnum.PROJECT_NAME, projectName)
    // 描述
    chartEditStore.setProjectInfo(ProjectInfoEnum.REMARKS, remarks)
    // 缩略图
    chartEditStore.setProjectInfo(ProjectInfoEnum.THUMBNAIL, indexImage)
    // 发布
    chartEditStore.setProjectInfo(ProjectInfoEnum.RELEASE, state === 1)
  }

  // * 数据获取
  const dataSyncFetch = async () => {
    // FIX:重新执行dataSyncFetch需清空chartEditStore.componentList,否则会导致图层重复
    // 切换语言等操作会导致重新执行 dataSyncFetch,此时pinia中并未清空chartEditStore.componentList，导致图层重复
    chartEditStore.componentList = []
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.START)
    try {
      const data = await $Api.fetchProjectApi({ projectId: fetchRouteParamsLocation() })

      if(!data) {
        chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.FAILURE)
      }
      // if (data) {
        if (data) {
          updateStoreInfo(data)
          // 更新全局数据
          await updateComponent(JSONParse(data.content))
          return
        }else {
          chartEditStore.setProjectInfo(ProjectInfoEnum.PROJECT_ID, fetchRouteParamsLocation())
        }
        setTimeout(() => {
          chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.SUCCESS)
        }, 1000)
        return
      // }
      // chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.FAILURE)
    } catch (error) {

      console.log('dataSyncFetch 报错了 --->>> ', error);

      chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.FAILURE)
      httpErrorHandle()
    }
  }

  // * 数据保存
  const dataSyncUpdate = throttle(async (updateImg = true) => {
    if(!fetchRouteParamsLocation()) return

    let projectId = chartEditStore.getProjectInfo[ProjectInfoEnum.PROJECT_ID];
    if(projectId === null || projectId === ''){
      window['$message'].error('数据初未始化成功,请刷新页面！')
      return
    }

    chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.START)

    // 异常处理：缩略图上传失败不影响JSON的保存
    try {
      if (updateImg) {
        // 获取缩略图片
        const range = document.querySelector('.go-edit-range')
        // 生成图片
        const canvasImage = await html2canvas(range, {
          backgroundColor: null,
          allowTaint: true,
          useCORS: true
        })

        // 上传预览图
        let uploadParams = new FormData()
        uploadParams.append('object', base64toFile(canvasImage.toDataURL(), `${fetchRouteParamsLocation()}_index_preview.png`))
        const uploadRes = await $Api.uploadFileApi(uploadParams)
        // 保存预览图
        if(uploadRes && uploadRes.code === ResultEnum.SUCCESS) {
          await $Api.updateProjectApi({
            id: fetchRouteParamsLocation(),
            indexImage: `${systemStore.getFetchInfo.OSSUrl}${uploadRes.data.fileName}`
          })
        }
      }
    } catch (e) {
      console.log('dataSyncUpdate 函数里面：', e)
    }

    // 保存数据
    let params = new FormData()
    params.append('projectId', projectId)
    params.append('content', JSONStringify(chartEditStore.getStorageInfo || {}))
    const data = await $Api.saveProjectApi(params)

    if(!data) chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.FAILURE)

    // 成功状态
    setTimeout(() => {
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.SUCCESS)
    }, 1000)
    return
    // 失败状态
    // chartEditStore.setEditCanvas(EditCanvasTypeEnum.SAVE_STATUS, SyncEnum.FAILURE)
  }, 3000)

  // * 定时处理
  const intervalDataSyncUpdate = () => {
    // 定时获取数据
    const syncTiming = setInterval(() => {
      dataSyncUpdate()
    }, saveInterval * 1000)

    // 销毁
    onUnmounted(() => {
      clearInterval(syncTiming)
    })
  }

  return {
    updateComponent,
    updateStoreInfo,
    dataSyncFetch,
    dataSyncUpdate,
    intervalDataSyncUpdate
  }
}
