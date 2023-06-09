<template>
  <!-- <v-chart
    ref="vChartRef"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    :update-options="{
      replaceMerge: replaceMergeArr,
    }"
    autoresize
  >
  </v-chart> -->
  <v-chart
    ref="vChartRef"
    :option="option"
    :manual-update="isPreview()"
    :update-options="{
      replaceMerge: replaceMergeArr,
    }"
    autoresize
  >
  </v-chart>
</template>

<script setup>
import { computed, watch, ref, nextTick } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import config, { includes, seriesItem } from "./config";
import { mergeTheme } from "@/packages/public/chart";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { useChartDataFetch } from "@/hooks";
import { isPreview } from "@/utils";
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import isObject from "lodash/isObject";

const props = defineProps({
  themeSetting: {
    type: Object,
    // required: true,
  },
  // themeColor: {
  //   type: Object,
  //   required: true,
  // },
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

const replaceMergeArr = ref();

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
});

// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  (newData, oldData) => {
    try {
      if (!isObject(newData) || !("dimensions" in newData)) return;
      if (Array.isArray(newData?.dimensions)) {
        const seriesArr = [];
        for (let i = 0; i < newData.dimensions.length - 1; i++) {
          seriesArr.push(seriesItem);
        }
        replaceMergeArr.value = ["series"];
        props.chartConfig.option.series = seriesArr;
        nextTick(() => {
          replaceMergeArr.value = [];
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  {
    deep: false,
  }
);

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore);
</script>
