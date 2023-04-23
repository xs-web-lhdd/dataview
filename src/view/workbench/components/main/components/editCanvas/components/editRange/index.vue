<script setup>
import { computed, toRefs } from "vue";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import EditShapeBox from "../editShapeBox/index.vue";
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

const chartEditStore = useChartEditStore();
const { handleContextMenu } = useContextMenu();

const { getEditCanvasConfig, getEditCanvas } = toRefs(chartEditStore);
const size = computed(() => {
  return {
    w: getEditCanvasConfig.value.width,
    h: getEditCanvasConfig.value.height,
  };
});

const rangeStyle = computed(() => {
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
// 操作枚举
const MenuEnum = {
  // 移动
  ARROW_UP: "up",
  ARROW_RIGHT: "right",
  ARROW_DOWN: "down",
  ARROW_LEFT: "left",
  // 删除
  DELETE: "delete",
  // 复制
  COPY: "copy",
  // 剪切
  CUT: "cut",
  // 粘贴
  PARSE: "parse",
  // 置顶
  TOP: "top",
  // 置底
  BOTTOM: "bottom",
  // 上移
  UP: "up",
  // 下移
  DOWN: "down",
  // 清空剪贴板
  CLEAR: "clear",
  // 成组
  GROUP: "group",
  // 解组
  UN_GROUP: "unGroup",
  // 后退
  BACK: "back",
  // 前进
  FORWORD: "forward",
  // 保存
  SAVE: "save",
  // 锁定
  LOCK: "lock",
  // 解除锁定
  UNLOCK: "unLock",
  // 隐藏
  HIDE: "hide",
  // 显示
  SHOW: "show",
};
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
    :style="rangeStyle"
    @mousedown="mousedownBoxSelect($event, undefined)"
  >
    <!-- <slot></slot> -->
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
          <!-- 右键 @contextmenu="handleContextMenu($event, item, optionsHandle)" -->
          <!-- @mouseenter="mouseenterHandle($event, item)"
          @mouseleave="mouseleaveHandle($event, item)"
          @mousedown="mousedownHandle($event, item)" -->
          <!-- 渲染拖拽到画布上的图表组件 -->
          <!-- <component
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
          ></component> -->
          <component
            class="edit-content-chart"
            :class="animationsClass(item.styles.animations)"
            :is="item.chartConfig.chartKey"
            :chartConfig="item"
            :themeSetting="themeSetting"
            themeColor="red"
            :style="{
              ...useSizeStyle(item.attr),
              ...getFilterStyle(item.styles),
              ...getTransformStyle(item.styles),
            }"
          ></component>
        </EditShapeBox>
      </div>
    </div>

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
