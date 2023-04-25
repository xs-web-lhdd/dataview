// * 组件相关的工具函数：
import { defineAsyncComponent } from 'vue'

/**
 * * 动态注册组件
 */
export const componentInstall = (key, node) => {
  // console.log('key node---->>>>', key, node);
  // console.log(window['$vue'].component(key));

  if (!window['$vue'].component(key) && node) {
    // 将拖拽的组件注册成全局组件
    window['$vue'].component(key, node)
  }
}

/**
 * * 异步加载组件
 * @param loader
 * @returns
 */
export const loadAsyncComponent = (loader) =>
  defineAsyncComponent({
    loader,
    // loadingComponent: AsyncLoading,
    delay: 20,
  })