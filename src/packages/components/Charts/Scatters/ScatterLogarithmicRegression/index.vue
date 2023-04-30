<template>
  <v-chart
    ref="vChartRef"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    :update-options="{ replaceMerge: replaceMergeArr }"
    autoresize
  >
  </v-chart>
</template>

<script setup>
import { computed, ref } from "vue";
import VChart from "vue-echarts";
import secStat from "echarts-stat";
import { use, registerTransform } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { ScatterChart, LineChart } from "echarts/charts";
import { UniversalTransition, LabelLayout } from "echarts/features";
import config, { includes } from "./config";
import { mergeTheme } from "@/packages/public/chart";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { useChartDataFetch } from "@/hooks";
import { isPreview } from "@/utils";
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TransformComponent,
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
  ScatterChart,
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent,
  UniversalTransition,
  LabelLayout,
]);

registerTransform(secStat.transform.regression);

const replaceMergeArr = ref();

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
});

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore);
</script>
