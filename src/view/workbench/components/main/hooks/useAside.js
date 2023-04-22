// * 顶级 vue
import { ref } from 'vue'
// * store
import { usePackagesStore } from '@/store/modules/packagesStore/index.js'

const { getPackagesList } = usePackagesStore()

const packagesListObj = {
  Charts: {
    icon: '&#xe670;',
    label: '图表'
  },
  Decorates: {
    icon: "&#xe60b;",
    label: '小组件'
  },
  Informations: {
    icon: "&#xe60b;",
    label: '信息'
  },
  Tables: {
    icon: "&#xe684;",
    label: '列表'
  }
}
const menuOptions = []
// 处理列表
const handlePackagesList = () => {
  // 向一级菜单 menuOptions 中填充数据,内容为对象(key, list, label, icon)
  for (const val in getPackagesList) {
    menuOptions.push({
      key: val,
      icon: packagesListObj[val].icon,
      label: packagesListObj[val].label,
      list: getPackagesList[val],
    })
  }
}
handlePackagesList()


const selectValue = ref(menuOptions[0]['key'])
// 选中的对象值
const selectOptions = ref(menuOptions[0])

export {
  selectValue,
  menuOptions,
  selectOptions
}