<template>
  <div :style="getStyle(borderRadius)">
    <n-image
      :object-fit="fit"
      preview-disabled
      :src="option.dataset"
      :fallback-src="requireErrorImg()"
      :width="w"
      :height="h"
    ></n-image>
  </div>
</template>

<script setup>
import { shallowReactive, watch, toRefs } from "vue";
import { requireErrorImg } from "@/utils";
import { useChartDataFetch } from "@/hooks";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

const { w, h } = toRefs(props.chartConfig.attr);
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option);

const option = shallowReactive({
  dataset: "",
});

const getStyle = (radius) => {
  return {
    borderRadius: `${radius}px`,
    overflow: "hidden",
  };
};

// 编辑更新
watch(
  () => props.chartConfig.option.dataset,
  (newData) => {
    option.dataset = newData;
  },
  {
    immediate: true,
  }
);

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData) => {
  option.dataset = newData;
});
</script>
