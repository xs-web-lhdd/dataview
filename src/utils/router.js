import router from '@/router/index.js'

/**
 * * 判断是否是预览页
 * @returns boolean
 */
export const isPreview = () => {
  return document.location.hash.includes('preview')
}

/**
 * * 根据路径跳转路由
 * @param path
 * @param query
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByPath = (
  path,
  query,
  isReplace,
  windowOpen
) => {
  let fullPath = ''
  if (query?.length) {
    fullPath = `${path}/${query.join('/')}`
  }
  if (windowOpen) {
    return openNewWindow(fullPath)
  }
  if (isReplace) {
    router.replace({
      path: fullPath,
    })
    return
  }
  router.push({
    path: fullPath,
  })
}

/**
 * * 新开页面
 * @param url
 */
export const openNewWindow = (url) => {
  return window.open(url, '_blank')
}
