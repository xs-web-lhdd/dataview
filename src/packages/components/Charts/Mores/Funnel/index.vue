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
import { computed } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { FunnelChart } from "echarts/charts";
import { includes } from "./config";
import { mergeTheme } from "@/packages/public/chart";
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
  FunnelChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
});

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore);
</script>
