<!-- 图表设置选项卡 -->

<script setup>
import NameSetting from "./components/nameSetting.vue";
import SizeSetting from "./components/sizeSetting.vue";
import PositionSetting from "./components/positionSetting.vue";
import { useTargetData } from "../../hooks/useTargetData.js";

const { targetData, chartEditStore } = useTargetData();
</script>

<template>
  <div>
    <!-- 名称 -->
    <NameSetting :chartConfig="targetData.chartConfig" />
    <!-- 尺寸 -->
    <SizeSetting :chartAttr="targetData.attr" />
    <!-- 位置 -->
    <PositionSetting
      :chartAttr="targetData.attr"
      :canvasConfig="chartEditStore.getEditCanvasConfig"
    />
    <!-- 图表自定义配置项 -->
    <component
      :is="targetData.chartConfig.conKey"
      :optionData="targetData.option"
    ></component>
  </div>
</template>

<style lang="scss" scoped></style>
