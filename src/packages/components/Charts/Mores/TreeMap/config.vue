<template>
  <global-setting :optionData="optionData"></global-setting>
</template>

<script setup>
import { GlobalSetting } from "@/components/Pages/ChartItemSetting";

defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});
</script>
