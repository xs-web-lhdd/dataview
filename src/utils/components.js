// * 组件相关的工具函数：

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