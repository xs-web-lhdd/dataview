<script setup>
// 组件
import ChartsOptions from "./components/ChartsOptions/index.vue";
import ChartsLayers from "./components/ChartsLayers/index.vue";
// store
import { useShowStore } from "@/store/modules/showStore/index.js";
// hooks
import {
  selectValue,
  menuOptions,
  selectOptions,
} from "../../hooks/useAside.js";

const store = useShowStore();

const handleSelect = (index) => {
  // 防止重复操作
  if (index === selectValue.value) {
    // 重复点击菜单收合
    store.changeCharts();
    return;
  } else {
    selectValue.value = index;
    if (!store.chartsShow) store.changeCharts();
    selectOptions.value = menuOptions.filter((item) => item.key === index)[0];
  }
};
</script>

<template>
  <aside class="charts">
    <div class="menu">
      <el-menu
        :default-active="selectValue"
        @select="handleSelect"
        class="el-menu-vertical-demo"
      >
        <el-menu-item :index="item.key" v-for="item in menuOptions">
          <i class="iconfont" style="" v-html="item.icon"></i>
          <template #title>{{ item.label }}</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div
      :class="
        store.chartsShow ? 'menu-options menu-charts-show' : 'menu-options'
      "
    >
      <ChartsOptions :select-options="selectOptions" />
    </div>
    <div
      :class="store.layersShow ? 'menu-layers menu-layers-show' : 'menu-layers'"
    >
      <ChartsLayers />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.charts {
  display: flex;
}
.menu {
  height: calc(100vh - 62px);
  border-right: 1px solid #dcdfe6;
  &-options {
    height: calc(100vh - 62px);
    width: 0;
    border-right: 1px solid #dcdfe6 !important;
    overflow: hidden;
    transition: all 0.2s linear;
  }
  &-charts-show {
    width: 260px;
    border-right: none !important;
  }
  &-layers {
    height: calc(100vh - 62px);
    width: 0;
    border-right: 1px solid #dcdfe6 !important;
    overflow: hidden;
    transition: all 0.2s linear;
  }
  &-layers-show {
    width: 200px;
    border-right: none !important;
  }
}
:deep(.el-menu) {
  border-right: none !important;
}
</style>
