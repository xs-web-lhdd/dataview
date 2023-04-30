<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData" :in-chart="true"></global-setting>
</template>

<script setup>
import { GlobalSetting } from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});
</script>
