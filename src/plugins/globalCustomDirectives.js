import VueLazyLoad from 'vue3-lazyload'
import { requireErrorImg } from '@/utils/utils.js'

/**
 * 注册全局自定义指令
 * @param app
 */
export function globalCustomDirectives(app) {
  // 图片懒加载
  app.use(VueLazyLoad, {
    error: requireErrorImg(),
  })
}