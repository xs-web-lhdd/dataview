<script setup>
import { ref, watch } from "vue";
import { fetchImages } from "@/packages";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

const imageInfo = ref("");
// 获取图片
const fetchImageUrl = async () => {
  imageInfo.value = await fetchImages(props.chartConfig);
};

watch(
  () => props.chartConfig.key,
  () => fetchImageUrl(),
  {
    immediate: true,
  }
);
</script>

<template>
  <img v-lazy="imageInfo" alt="图表图片" />
</template>
