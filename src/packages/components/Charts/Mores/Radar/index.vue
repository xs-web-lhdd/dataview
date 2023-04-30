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
import { ref, computed, watch } from "vue";
import VChart from "vue-echarts";
import dataJson from "./data.json";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { RadarChart } from "echarts/charts";
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
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const vChartRef = ref();

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
});

const dataSetHandle = (dataset) => {
  if (dataset.seriesData) {
    props.chartConfig.option.series[0].data = dataset.seriesData;
    props.chartConfig.option.legend.data = dataset.seriesData.map(
      (i) => i.name
    );
  }
  if (dataset.radarIndicator) {
    props.chartConfig.option.radar.indicator = dataset.radarIndicator;
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
