<template>
  <setting-item-box v-if="targetData" name="位置">
    <setting-item :name="`偏移 X：${targetData.left || 0}px`">
      <n-input-number
        v-model:value="targetData.left"
        size="small"
        step="10"
      ></n-input-number>
    </setting-item>
    <setting-item :name="`偏移 Y：${targetData.top || 0}px`">
      <n-input-number
        v-model:value="targetData.top"
        size="small"
        step="10"
      ></n-input-number>
    </setting-item>
  </setting-item-box>
</template>

<script setup>
import { reactive } from "vue";
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  targetData: {
    type: Object,
    required: true,
  },
});
</script>
