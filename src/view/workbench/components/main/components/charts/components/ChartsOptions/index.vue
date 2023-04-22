<!-- 二级菜单组件 -->
<script setup>
import { watch, ref, reactive } from "vue";
import ChartsItemBox from "../ChartsItemBox/index.vue";

const props = defineProps({
  selectOptions: {
    type: Object,
    default: () => {},
  },
});

const selectValue = ref("");
let packages = reactive({
  // 侧边栏
  menuOptions: [],
  // 当前选择
  selectOptions: {},
  // 分类归档
  categorys: {
    All: [],
  },
  categoryNames: {
    All: "所有图",
  },
  // 分类归档数量
  categorysNum: 0,
  // 存储不同类别组件进来的选中值
  saveSelectOptions: {},
});

// 设置初始列表
const setSelectOptions = (categorys) => {
  for (const val in categorys) {
    // console.log("初始化列表: ", categorys[val]);
    packages.selectOptions = categorys[val];
    break;
  }
};
// 二级菜单选择切换事件：
const handleSelectItem = (index) => {
  // 防止重复点击一个按钮：
  if (selectValue.value == index) return;
  packages.selectOptions = packages.categorys[index];
  selectValue.value = index;
};

watch(
  () => {
    return props.selectOptions;
  },
  (newData) => {
    /**
     * * 将一级菜单中的 list 进行分类,然后生成二级菜单和二级菜单对应的列表
     */
    packages.categorysNum = 0;
    packages.menuOptions = [];
    packages.selectOptions = {};
    packages.categorys = {
      All: [],
    };
    packages.categoryNames = {
      All: "所有图",
    };
    packages.selectOptions = {};
    if (!newData) return;
    newData.list.forEach((e) => {
      // 将 category 进行区分
      const value = packages.categorys[e.category];
      packages.categorys[e.category] =
        value && value.length ? [...value, e] : [e];
      packages.categoryNames[e.category] = e.categoryName;
      // 在列表里面加入 全部选项卡
      packages.categorys["All"].push(e);
    });
    for (const val in packages.categorys) {
      packages.categorysNum += 1;
      packages.menuOptions.push({
        key: val,
        label: packages.categoryNames[val],
      });
    }
    // TODO: console.log(packages)
    setSelectOptions(packages.categorys);
    // 默认选中处理
    selectValue.value = packages.menuOptions[0]["key"];
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="options">
    <div class="options-menu">
      <el-scrollbar>
        <el-menu :default-active="selectValue" @select="handleSelectItem">
          <el-menu-item :index="item.key" v-for="item in packages.menuOptions">
            <template #title>{{ item.label }}</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="options-charts">
      <el-scrollbar class="scrollbar">
        <ChartsItemBox :list-options="packages.selectOptions" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.options {
  display: flex;
  &-menu {
    border-right: 1px solid #dcdfe6 !important;
  }
  &-charts {
    width: 400px;
    .scrollbar {
      height: calc(100vh - 62px);
    }
  }
}
:deep(.el-menu) {
  max-width: 80px;
  height: calc(100vh - 62px);
}
</style>
