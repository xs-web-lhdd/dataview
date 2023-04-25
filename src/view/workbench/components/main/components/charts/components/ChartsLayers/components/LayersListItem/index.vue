<template>
  <div :class="select ? 'item item-select' : 'item'">
    <div class="item-img">
      <ChartGlobalImage :chartConfig="props.componentData.chartConfig" />
    </div>
    <div class="item-title">{{ props.componentData.chartConfig.title }}</div>
    <div class="item-icon">
      <el-icon class="icon" @click="handleLock">
        <Lock class="icon-color" v-if="props.componentData.status.lock" />
        <Unlock v-else />
      </el-icon>
      <el-icon class="icon" @click="handleHide">
        <View v-if="!props.componentData.status.hide" />
        <Hide class="icon-color" v-else />
      </el-icon>
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

console.log("props.componentData", props.componentData);

// 计算当前选中目标
const select = computed(() => {
  const id = props.componentData.id;
  return chartEditStore.getTargetChart.selectId.find((e) => e === id);
});

const handleLock = (e) => {
  e.stopPropagation();
  props.componentData.status.lock
    ? chartEditStore.setUnLock()
    : chartEditStore.setLock();
};
const handleHide = (e) => {
  e.stopPropagation();
  props.componentData.status.hide
    ? chartEditStore.setShow()
    : chartEditStore.setHide();
};
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
      &-color {
        color: #409eff;
      }
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
