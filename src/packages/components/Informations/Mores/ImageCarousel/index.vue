<template>
  <div>
    <n-carousel
      :autoplay="autoplay"
      :interval="interval"
      :centered-slides="centeredSlides"
      :direction="direction"
      :dot-placement="dotPlacement"
      :dot-type="dotType"
      :draggable="draggable"
      :effect="effect"
      :slides-per-view="slidesPerview"
      :show-arrow="showArrow"
      :show-dots="showDots"
    >
      <n-image
        v-for="(url, index) in option.dataset"
        preview-disabled
        :key="index"
        :object-fit="fit"
        :src="url"
        :fallback-src="requireErrorImg()"
        :width="w"
        :height="h"
      ></n-image>
    </n-carousel>
  </div>
</template>
<script setup>
import { toRefs, shallowReactive, watch } from "vue";
import { requireErrorImg } from "@/utils";
import { useChartDataFetch } from "@/hooks";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { option as configOption } from "./config";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

const option = shallowReactive({
  dataset: configOption.dataset,
});

const { w, h } = toRefs(props.chartConfig.attr);
const {
  autoplay,
  interval,
  slidesPerview,
  direction,
  draggable,
  centeredSlides,
  effect,
  dotType,
  dotPlacement,
  showArrow,
  showDots,
  fit,
} = toRefs(props.chartConfig.option);

watch(
  () => props.chartConfig.option.dataset,
  (newData) => {
    option.dataset = newData;
  },
  {
    immediate: true,
    deep: false,
  }
);

useChartDataFetch(props.chartConfig, useChartEditStore, (newData) => {
  option.dataset = newData;
});
</script>
