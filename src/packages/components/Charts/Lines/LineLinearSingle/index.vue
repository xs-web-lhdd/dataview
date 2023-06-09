<template>
  <v-chart
    ref="vChartRef"
    :theme="themeColor"
    :option="option.value"
    :manual-update="isPreview()"
    autoresize
  >
  </v-chart>
</template>

<script setup>
import { watch, reactive } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import config, { includes } from "./config";
import { mergeTheme } from "@/packages/public/chart";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { chartColorsSearch, defaultTheme } from "@/settings/chartThemes/index";
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { useChartDataFetch } from "@/hooks";
import { isPreview, colorGradientCustomMerge } from "@/utils";

const props = defineProps({
  themeSetting: {
    type: Object,
    // required: true,
  },
  themeColor: {
    type: Object,
    // required: true,
  },
  chartConfig: {
    type: Object,
    required: true,
  },
});

use([
  DatasetComponent,
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const chartEditStore = useChartEditStore();
const option = reactive({
  value: {},
});

// 初始化与渐变色处理
watch(
  () => chartEditStore.getEditCanvasConfig.chartThemeColor,
  (newColor) => {
    try {
      if (!isPreview()) {
        const themeColor =
          colorGradientCustomMerge(
            chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo
          )[newColor] ||
          colorGradientCustomMerge(
            chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo
          )[defaultTheme];
        props.chartConfig.option.series.forEach((value) => {
          value.lineStyle.shadowColor = themeColor[2];
          value.lineStyle.color.colorStops.forEach((v, i) => {
            v.color = themeColor[i];
          });
        });
      }
      option.value = mergeTheme(
        props.chartConfig.option,
        props.themeSetting,
        includes
      );
      props.chartConfig.option = option.value;
    } catch (error) {
      console.log(error);
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.chartConfig.option.dataset,
  () => {
    option.value = props.chartConfig.option;
  },
  {
    deep: false,
  }
);

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore);
</script>
