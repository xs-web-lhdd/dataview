<template>
  <v-chart
    ref="vChartRef"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    autoresize
  ></v-chart>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import VChart from "vue-echarts";
import dataJson from "./data.json";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { HeatmapChart } from "echarts/charts";
import { includes } from "./config";
import { mergeTheme, setOption } from "@/packages/public/chart";
import { useChartDataFetch } from "@/hooks";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { isPreview } from "@/utils";
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
} from "echarts/components";

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
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
]);

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
});

const vChartRef = ref();

const dataSetHandle = (dataset) => {
  const { seriesData, xAxis, yAxis } = dataset;
  if (xAxis) {
    props.chartConfig.option.xAxis.data = xAxis;
  }
  if (yAxis) {
    props.chartConfig.option.yAxis.data = yAxis;
  }
  if (seriesData) {
    props.chartConfig.option.series[0].data = seriesData;
  }
  if (vChartRef.value && isPreview()) {
    setOption(vChartRef.value, props.chartConfig.option);
  }
};

watch(
  () => props.chartConfig.option.dataset,
  (newData) => {
    try {
      dataSetHandle(newData);
    } catch (error) {
      console.log(error);
    }
  },
  {
    deep: false,
  }
);

useChartDataFetch(props.chartConfig, useChartEditStore, (newData) => {
  dataSetHandle(newData);
});
</script>
