import { defineStore } from 'pinia'
import debounce from 'lodash/debounce'
import { isString } from '@/utils'

export const useChartEditStore = defineStore('useChartEditStore', {
  state: () => {
    return {
       // 画布属性
      editCanvas: {
        // 编辑区域 Dom
        editLayoutDom: null,
        editContentDom: null,
        // 偏移量
        offset: 20,
        // 系统控制缩放
        scale: 1,
        // 用户控制的缩放
        userScale: 1,
        // 锁定缩放
        lockScale: false,
        // 初始化
        isCreate: false,
        // 拖拽中
        isDrag: false,
        // 框选中
        isSelect: false,
        // 代码编辑中
        isCodeEdit: false
      },
      // 画布属性（需存储给后端）
      editCanvasConfig: {
        // 项目名称
        projectName: undefined,
        // 默认宽度
        width: 1920,
        // 默认高度
        height: 1080,
        // 启用滤镜
        filterShow: false,
        // 色相
        hueRotate: 0,
        // 饱和度
        saturate: 1,
        // 对比度
        contrast: 1,
        // 亮度
        brightness: 1,
        // 透明度
        opacity: 1,
        // 变换（暂不更改）
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        skewX: 0,
        skewY: 0,
        // 混合模式
        blendMode: 'normal',
        // 默认背景色
        background: undefined,
        backgroundImage: undefined,
        // 是否使用纯颜色
        selectColor: true,
        // chart 主题色
        // chartThemeColor: defaultTheme || 'dark',
        // 自定义颜色列表
        chartCustomThemeColorInfo: undefined,
        // 全局配置
        // chartThemeSetting: globalThemeJson,
        // 适配方式
        // previewScaleType: previewScaleType
      },
      // 目标图表
      targetChart: {
        hoverId: undefined,
        selectId: []
      },
      componentList: []
    }
  },
  getters: {
    getEditCanvas() {
      return this.editCanvas
    },
    getEditCanvasConfig() {
      return this.editCanvasConfig
    }
  },
  actions: {
    // * 设置 editCanvas 数据项
    setEditCanvas(key, value) {
      this.editCanvas[key] = value
    },
    // * 设置目标数据 select
    setTargetSelectChart(selectId, push = false) {
      // 重复选中
      if (this.targetChart.selectId.find((e) => e === selectId)) return
      // 无 id 清空
      if (!selectId) {
        this.targetChart.selectId = []
        return
      }
      // 多选
      if (push) {
        // 字符串
        if (isString(selectId)) {
          this.targetChart.selectId.push(selectId)
          return
        }
        // 数组
        if (isArray(selectId)) {
          this.targetChart.selectId.push(...selectId)
          return
        }
      } else {
        // 字符串
        if (isString(selectId)) {
          this.targetChart.selectId = [selectId]
          return
        }
        // 数组
        if (isArray(selectId)) {
          this.targetChart.selectId = selectId
          return
        }
      }
    },
    /**
     * * 新增组件列表
     * @param componentInstance 新图表实例
     * @param isHead 是否头部插入
     * @param isHistory 是否进行记录
     * @returns
     */
    addComponentList(
      componentInstance,
      isHead = false,
      isHistory = false
    ) {
      if (componentInstance instanceof Array) {
        componentInstance.forEach(item => {
          this.addComponentList(item, isHead, isHistory)
        })
        return
      }
      if (isHistory) {
        // chartHistoryStore.createAddHistory([componentInstance])
      }
      if (isHead) {
        this.componentList.unshift(componentInstance)
        return
      }
      this.componentList.push(componentInstance)
    },
    // * 设置页面样式属性
    setPageStyle(key, value) {
      const dom = this.getEditCanvas.editContentDom
      if (dom) {
        dom.style[key] = value
      }
    },
    // ----------------   设置页面大小   ---------------
    // * 计算缩放
    computedScale() {
      if (this.getEditCanvas.editLayoutDom) {
        // 现有展示区域
        const width = this.getEditCanvas.editLayoutDom.clientWidth - this.getEditCanvas.offset * 2 - 5
        const height = this.getEditCanvas.editLayoutDom.clientHeight - this.getEditCanvas.offset * 4
        // 用户设定大小
        const editCanvasWidth = this.editCanvasConfig.width
        const editCanvasHeight = this.editCanvasConfig.height
        // 需保持的比例
        const baseProportion = parseFloat((editCanvasWidth / editCanvasHeight).toFixed(5))
        const currentRate = parseFloat((width / height).toFixed(5))
        if (currentRate > baseProportion) {
          // 表示更宽
          // console.log('表示更宽！！！');
          const scaleWidth = parseFloat(((height * baseProportion) / editCanvasWidth).toFixed(5))
          this.setScale(scaleWidth > 1 ? 1 : scaleWidth)
        } else {
          // 表示更高
          // console.log('表示更高！！！');
          const scaleHeight = parseFloat((width / baseProportion / editCanvasHeight).toFixed(5))
          this.setScale(scaleHeight > 1 ? 1 : scaleHeight)
        }
      } else {
        // TODO: 没有画布提示先创建画布
        alert('请先创建画布，再进行缩放')
        // window['$message'].warning('请先创建画布，再进行缩放')
      }
    },
    // * 监听缩放
    listenerScale() {
      const resize = debounce(this.computedScale, 200)
      // 默认执行一次
      resize()
      // 开始监听
      window.addEventListener('resize', resize)
      // 销毁函数
      const remove = () => {
        window.removeEventListener('resize', resize)
      }
      return remove
    },
    /**
     * * 设置缩放
     * @param scale 0~1 number 缩放比例;
     * @param force boolean 强制缩放
     */
    setScale(scale, force) {
      if (!this.getEditCanvas.lockScale || force) {
        this.setPageSize(scale)
        this.getEditCanvas.userScale = scale
        this.getEditCanvas.scale = scale
      }
    },
    // * 设置画布的大小
    setPageSize(scale) {
      this.setPageStyle('height', `${this.editCanvasConfig.height * scale}px`)
      this.setPageStyle('width', `${this.editCanvasConfig.width * scale}px`)
    },
  },
})