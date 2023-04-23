import { useRoute } from 'vue-router'
import { useChartEditStore } from '@/store/modules/chartEditStore/index.js'
import { fetchPathByName, getLocalStorage, setSessionStorage, routerTurnByPath } from "@/utils";

const routerParamsInfo = useRoute();
const chartEditStore = useChartEditStore()


const StorageEnum = {
  // 全局设置
  GO_SYSTEM_SETTING_STORE: 'GO_SYSTEM_SETTING',
  // token 等信息
  GO_ACCESS_TOKEN_STORE: 'GO_ACCESS_TOKEN',
  // 登录信息
  GO_LOGIN_INFO_STORE: 'GO_LOGIN_INFO',
  // 语言
  GO_LANG_STORE: 'GO_LANG',
  // 当前选择的主题
  GO_DESIGN_STORE: 'GO_DESIGN',
  // 工作台布局配置
  GO_CHART_LAYOUT_STORE: 'GO_CHART_LAYOUT',
  // 工作台需要保存的数据
  GO_CHART_STORAGE_LIST: 'GO_CHART_STORAGE_LIST'
}


// 预览
const previewHandle = () => {
  const path = fetchPathByName("ChartPreview", "href");
  if (!path) return;
  console.log('path ---- >>>', path);
  // TODO: 先假设项目 id 为 1
  // const { id } = routerParamsInfo.params;
  const id = '1'
  // id 标识
  const previewId = typeof id === "string" ? id : id[0];
  const storageInfo = chartEditStore.getStorageInfo;
  const sessionStorageInfo =
    getLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST) || [];

  if (sessionStorageInfo?.length) {
    const repeateIndex = sessionStorageInfo.findIndex(
      (e) => e.id === previewId
    );
    // 重复替换
    if (repeateIndex !== -1) {
      sessionStorageInfo.splice(repeateIndex, 1, {
        id: previewId,
        ...storageInfo,
      });
      setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, sessionStorageInfo);
    } else {
      sessionStorageInfo.push({
        id: previewId,
        ...storageInfo,
      });
      setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, sessionStorageInfo);
    }
  } else {
    setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [
      { id: previewId, ...storageInfo },
    ]);
  }
  // 跳转
  routerTurnByPath(path, [previewId], undefined, true);
};

export {
  previewHandle
}