<!-- 右边配置栏 -->

<script setup>
import { ref, computed } from "vue";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { useShowStore } from "@/store/modules/showStore/index.js";
import { loadAsyncComponent } from "@/utils";

// 画布：
const CanvasPage = loadAsyncComponent(() =>
  import("./components/CanvasPage/index.vue")
);
// 定制选项：
const ChartSetting = loadAsyncComponent(() =>
  import("./components/ChartSetting/index.vue")
);
// 数据选项：
const ChartData = loadAsyncComponent(() =>
  import("./components/ChartData/index.vue")
);

const store = useShowStore();
const chartEditStore = useChartEditStore();

const globalActiveName = ref("pageSetting");
const chartActiveName = ref("chartSetting");

// 页面设置
const globalTabList = [
  {
    key: "pageSetting",
    title: "全局页面配置",
    // icon: DesktopOutlineIcon,
    // 将每一个编辑选项的组件引入，然后作为 render 参数传递过去
    render: CanvasPage,
  },
];
// 图表设置
const chartsTabList = [
  {
    key: "chartSetting",
    title: "定制",
    // icon: ConstructIcon,
    render: ChartSetting,
  },
  {
    key: "chartData",
    title: "数据",
    // icon: FlashIcon,
    render: ChartData,
  },
];

const selectTarget = computed(() => {
  const selectId = chartEditStore.getTargetChart.selectId;
  // 排除多个
  if (selectId.length !== 1) return undefined;
  const target =
    chartEditStore.componentList[chartEditStore.fetchTargetIndex()];
  if (target?.isGroup) {
    tabsSelect.value = TabsEnum.CHART_SETTING;
  }
  return target;
});
</script>

<template>
  <aside class="configuration">
    <div :class="store.configurationShow ? 'content content-show' : 'content'">
      <!-- 画布配置 -->
      <el-tabs
        v-if="!selectTarget"
        v-model="globalActiveName"
        type="border-card"
      >
        <el-tab-pane
          v-for="item in globalTabList"
          :key="item.key"
          :label="item.title"
          :name="item.key"
        >
          <template #label>
            <span>
              <el-icon><calendar /></el-icon>
              <span>{{ item.title }}</span>
            </span>
          </template>
          <component :is="item.render"></component>
        </el-tab-pane>
      </el-tabs>
      <!-- 选中图表配置 -->
      <el-tabs v-if="selectTarget" v-model="chartActiveName" type="border-card">
        <el-tab-pane
          :label="item.title"
          :name="item.key"
          v-for="item in chartsTabList"
          :key="item.key"
        >
          <template #label>
            <span>
              <el-icon style="vertical-align: middle; font-size: 14px"
                ><calendar
              /></el-icon>
              <span style="vertical-align: middle">{{ item.title }}</span>
            </span>
          </template>
          <component :is="item.render"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.configuration {
  .content {
    width: 350px;
    background-color: aquamarine;
    width: 0px;
    border-left: none !important;
    transition: all 0.2s linear;
    &-show {
      width: 350px;
      border-left: 1px solid #dcdfe6 !important;
    }
  }
}
:deep(.el-tabs__nav) {
  float: none !important;
  justify-content: center;
}
</style>
