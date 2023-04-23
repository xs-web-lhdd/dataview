<template>
  <div :class="select ? 'item item-select' : 'item'">
    <div class="item-img">
      <ChartGlobalImage :chartConfig="props.componentData.chartConfig" />
    </div>
    <div class="item-title">{{ props.componentData.chartConfig.title }}</div>
    <div class="item-icon">
      <el-icon class="icon"><Lock /></el-icon>
      <el-icon class="icon"><View /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ChartGlobalImage from "@/components/ChartGlobalImage/index.vue";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";

const chartEditStore = useChartEditStore();

const props = defineProps({
  componentData: {
    type: Object,
    required: true,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  layerMode: {
    type: String,
    default: "thumbnail",
  },
});

// 计算当前选中目标
const select = computed(() => {
  const id = props.componentData.id;
  return chartEditStore.getTargetChart.selectId.find((e) => e === id);
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  width: 90%;
  height: 52px;
  box-sizing: border-box;
  margin: 5px 5%;
  padding: 3px;
  transition: background-color 0.2s ease-in-out 0.1s;
  border-radius: 5px;
  &-img {
    height: 100%;
    img {
      height: calc(100% - 10px);
      border-radius: 5px;
      margin: 5px;
    }
  }
  &-title {
    font-size: 12px;
    flex: 1;
  }
  &-icon {
    margin-right: 5px;
    .icon {
      cursor: pointer;
      margin-left: 5px;
      transition: color 0.3s linear;
    }
    .icon:hover {
      color: #409eff;
    }
  }
  &-select {
    border: 1px solid #409eff;
    background-color: rgba($color: #409eff, $alpha: 0.3);
  }
}
.item:hover {
  background-color: #e3e3e4;
}
</style>
