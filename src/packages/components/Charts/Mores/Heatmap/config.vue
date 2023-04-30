<template>
  <global-setting :optionData="optionData"></global-setting>
</template>

<script setup>
import { computed } from "vue";
import { GlobalSetting } from "@/components/Pages/ChartItemSetting";
import { option } from "./config";

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});

const heatMapConfig = computed(() => {
  return props.optionData;
});
</script>
