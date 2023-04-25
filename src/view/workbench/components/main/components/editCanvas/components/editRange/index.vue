<script setup>
import { computed, toRefs } from "vue";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import EditShapeBox from "../editShapeBox/index.vue";
import EditSelect from "../EditSelect/index.vue";
import { useContextMenu } from "../../../../hooks/useContentMenu.js";
import {
  mousedownBoxSelect,
  useMouseHandle,
} from "../../../../hooks/useDrag.js";
import { useSizeStyle, useComponentStyle } from "../../hooks/useStyle";
import {
  getBlendModeStyle,
  getFilterStyle,
  getTransformStyle,
  animationsClass,
  colorCustomMerge,
} from "@/utils";
import { MenuEnum } from "@/enums/editPageEnum.js";

const chartEditStore = useChartEditStore();
const { handleContextMenu } = useContextMenu();

const { getEditCanvasConfig, getEditCanvas } = toRefs(chartEditStore);
const size = computed(() => {
  return {
    w: getEditCanvasConfig.value.width,
    h: getEditCanvasConfig.value.height,
  };
});

// 背景
const rangeStyle = computed(() => {
  // 设置背景色和图片背景
  const background = chartEditStore.getEditCanvasConfig.background;
  const backgroundImage = chartEditStore.getEditCanvasConfig.backgroundImage;
  const selectColor = chartEditStore.getEditCanvasConfig.selectColor;
  const backgroundColor = background ? background : undefined;

  const computedBackground = selectColor
    ? { background: backgroundColor }
    : {
        background: `url(${backgroundImage}) no-repeat center center / cover !important`,
      };

  return {
    ...computedBackground,
    width: "inherit",
    height: "inherit",
  };
});

// 背景
const rangeStyleRange = computed(() => {
  // 缩放
  const scale = {
    transform: `scale(${getEditCanvas.value.scale})`,
  };
  return { ...useSizeStyle(size.value), ...scale };
});

// 模态层
const rangeModelStyle = computed(() => {
  const dragStyle = getEditCanvas.value.isCreate && { "z-index": 99999 };
  return { ...useSizeStyle(size.value), ...dragStyle };
});

// 点击事件
const {
  mouseenterHandle,
  mouseleaveHandle,
  mousedownHandle,
  mouseClickHandle,
} = useMouseHandle();

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting =
    chartEditStore.getEditCanvasConfig.chartThemeSetting;
  return chartThemeSetting;
});

// 配置项
const themeColor = computed(() => {
  const colorCustomMergeData = colorCustomMerge(
    chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo
  );
  return colorCustomMergeData[
    chartEditStore.getEditCanvasConfig.chartThemeColor
  ];
});

// 右键事件
const optionsHandle = (targetList, allList, targetInstance) => {
  console.log("画板-触发右键事件了！！！");
  // 多选处理
  if (chartEditStore.getTargetChart.selectId.length > 1) {
    return allList.filter((i) =>
      [MenuEnum.GROUP, MenuEnum.DELETE].includes(i.key)
    );
  }
  const statusMenuEnums = [];
  if (targetInstance.status.lock) {
    statusMenuEnums.push(MenuEnum.LOCK);
  } else {
    statusMenuEnums.push(MenuEnum.UNLOCK);
  }
  if (targetInstance.status.hide) {
    statusMenuEnums.push(MenuEnum.HIDE);
  } else {
    statusMenuEnums.push(MenuEnum.SHOW);
  }
  return targetList.filter((i) => !statusMenuEnums.includes(i.key));
};
</script>

<template>
  <div
    class="go-edit-range go-transition"
    :style="rangeStyleRange"
    @mousedown="mousedownBoxSelect($event, undefined)"
  >
    <!-- 滤镜预览 -->
    <div
      :style="{
        ...getFilterStyle(chartEditStore.getEditCanvasConfig),
        ...rangeStyle,
      }"
    >
      <!-- 渲染图表，从 componentList 列表中取出存储的图表信息，将其渲染出来 -->
      <div
        v-for="(item, index) in chartEditStore.getComponentList"
        :key="item.id"
      >
        <!-- 分组 -->
        <!-- <edit-group
          v-if="item.isGroup"
          :groupData="item"
          :groupIndex="index"
        ></edit-group> -->

        <!-- 单组件 -->
        <EditShapeBox
          :data-id="item.id"
          :index="index"
          :style="{
            ...useComponentStyle(item.attr, index),
            ...getBlendModeStyle(item.styles),
          }"
          :item="item"
          @click="mouseClickHandle($event, item)"
          @mouseenter="mouseenterHandle($event, item)"
          @mouseleave="mouseleaveHandle($event, item)"
          @mousedown="mousedownHandle($event, item)"
          @contextmenu="handleContextMenu($event, item, optionsHandle)"
        >
          <component
            class="edit-content-chart"
            :class="animationsClass(item.styles.animations)"
            :is="item.chartConfig.chartKey"
            :chartConfig="item"
            :themeSetting="themeSetting"
            :themeColor="themeColor"
            :style="{
              ...useSizeStyle(item.attr),
              ...getFilterStyle(item.styles),
              ...getTransformStyle(item.styles),
            }"
          ></component>
        </EditShapeBox>
      </div>
    </div>

    <!-- 水印 -->
    <!-- 拖拽时的辅助线 -->
    <!-- 框选时的样式框 -->
    <EditSelect></EditSelect>
    <!-- 拖拽时的遮罩 -->
    <div class="go-edit-range-model" :style="rangeModelStyle"></div>
  </div>
</template>

<style lang="scss" scoped>
.go-edit-range {
  position: relative;
  transform-origin: left top;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
  // @include fetch-border-color("hover-border-color");
  border: 1px solid #373739;
  // @include fetch-bg-color("background-color2");
  background-color: #232324;
  &-model {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
