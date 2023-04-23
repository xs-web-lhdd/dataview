<template>
  <div
    class="chart-item"
    v-for="(item, index) in localStorageInfo.componentList"
    :class="animationsClass(item.styles.animations)"
    :key="item.id"
    :style="{
      ...getComponentAttrStyle(item.attr, index),
      ...getFilterStyle(item.styles),
      ...getTransformStyle(item.styles),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...getBlendModeStyle(item.styles),
    }"
  >
    <!-- 分组 -->
    <!-- <preview-render-group
      v-if="item.isGroup"
      :groupData="(item as CreateComponentGroupType)"
      :groupIndex="index"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
    ></preview-render-group> -->

    <!-- 将单个图表组件渲染出来 -->
    <component
      :is="item.chartConfig.chartKey"
      :id="item.id"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
      :style="{ ...getSizeStyle(item.attr) }"
      v-on="useLifeHandler(item)"
    ></component>
  </div>
</template>

<script setup>
/**
 * * 把存在 localStorage 中的 componentList 取出来然后渲染出来
 */
import { computed, onMounted } from "vue";
import { useChartDataPondFetch } from "@/hooks";
// import { PreviewRenderGroup } from "../PreviewRenderGroup/index";
// import { chartColors } from "@/settings/chartThemes/index";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import {
  animationsClass,
  getFilterStyle,
  getTransformStyle,
  getBlendModeStyle,
  colorCustomMerge,
} from "@/utils";
import {
  getSizeStyle,
  getComponentAttrStyle,
  getStatusStyle,
  getPreviewConfigStyle,
} from "../../utils";
import { useLifeHandler } from "@/hooks";

// 初始化数据池
const { initDataPond, clearMittDataPondMap } = useChartDataPondFetch();
const chartEditStore = useChartEditStore();

const props = defineProps({
  localStorageInfo: {
    type: Object,
    required: true,
  },
});

// TODO:
// console.log('props.localStorageInfo --->>> ', props.localStorageInfo)

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting =
    props.localStorageInfo.editCanvasConfig.chartThemeSetting;
  return chartThemeSetting;
});

// 配置项
const themeColor = computed(() => {
  const colorCustomMergeData = colorCustomMerge(
    props.localStorageInfo.editCanvasConfig.chartCustomThemeColorInfo
  );
  return colorCustomMergeData[
    props.localStorageInfo.editCanvasConfig.chartThemeColor
  ];
});

// 组件渲染结束初始化数据池
clearMittDataPondMap();
onMounted(() => {
  initDataPond(props.localStorageInfo.requestGlobalConfig);
});
</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>
