import { getSessionStorage } from '@/utils/index.js'
import { StorageEnum } from '@/enums/storageEnum'


// 根据路由 id 获取存储数据的信息
export const getSessionStorageInfo = () => {
  const urlHash = document.location.hash
  const toPathArray = urlHash.split('/')
  const id = toPathArray && toPathArray[toPathArray.length - 1]

  const storageList = getSessionStorage(
    StorageEnum.GO_CHART_STORAGE_LIST
  )

  if(!storageList) return

  for (let i = 0; i < storageList.length; i++) {
    if (id.toString() === storageList[i]['id']) {
      return storageList[i]
    }
  }
}