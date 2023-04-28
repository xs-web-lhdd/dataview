<!-- 工作台 -->

<script setup>
import { computed, ref, reactive, toRefs } from "vue";
import {
  dragoverHandle,
  dragHandle,
  mousedownHandleUnStop,
} from "../../hooks/useDrag.js";
// * 引入store
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { useGlobalStore } from "@/store/modules/globalStore/index.js";

const $app = ref();
const refSketchRuleBox = ref();
const $container = ref();
const cursorStyle = ref("auto");
const chartEditStore = useChartEditStore();
const globalStore = useGlobalStore();
const thick = 20;
const isPressSpace = ref(false);
const scale = computed(() => {
  return chartEditStore.getEditCanvas.scale;
});
const sketchRuleReDraw = ref(true);
const { width, height } = toRefs(chartEditStore.getEditCanvasConfig);
const startX = ref(0);
const startY = ref(0);
const lines = reactive({ h: [], v: [] });
// 计算画布大小
const canvasBox = () => {
  const layoutDom = document.getElementById("go-chart-edit-layout");
  if (layoutDom) {
    return {
      height: layoutDom.clientHeight - 25,
      width: layoutDom.clientWidth,
    };
  }

  return {
    width: width.value,
    height: height.value,
  };
};
// 主题
const paletteStyle = computed(() => {
  const isDarkTheme = globalStore.getDarkTheme;
  return isDarkTheme
    ? {
        bgColor: "#18181c",
        longfgColor: "#4d4d4d",
        shortfgColor: "#4d4d4d",
        fontColor: "#4d4d4d",
        shadowColor: "#18181c",
        borderColor: "#18181c",
        cornerActiveColor: "#18181c",
      }
    : {};
});

// 滚动条处理
const handleScroll = () => {
  if (!$app.value) return;
  const screensRect = $app.value.getBoundingClientRect();
  const canvasRect = refSketchRuleBox.value.getBoundingClientRect();
  // 标尺开始的刻度
  startX.value = (screensRect.left + thick - canvasRect.left) / scale.value;
  startY.value = (screensRect.top + thick - canvasRect.top) / scale.value;
};
// 滚动条拖动的高度
const containerWidth = computed(() => {
  return `${height.value * 2}px`;
});
// 拖拽处理
const dragCanvas = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.which == 2) isPressSpace.value = true;
  else if (!window.$KeyboardActive?.space) return;
  document.activeElement?.blur();

  const startX = e.pageX;
  const startY = e.pageY;

  const listenMousemove = listen(window, "mousemove", (e) => {
    const nx = e.pageX - startX;
    const ny = e.pageY - startY;

    const [prevMoveX1, prevMoveX2] = prevMoveXValue;
    const [prevMoveY1, prevMoveY2] = prevMoveYValue;

    prevMoveXValue = [prevMoveX2, nx];
    prevMoveYValue = [prevMoveY2, ny];

    $app.value.scrollLeft -=
      prevMoveX2 > prevMoveX1
        ? Math.abs(prevMoveX2 - prevMoveX1)
        : -Math.abs(prevMoveX2 - prevMoveX1);
    $app.value.scrollTop -=
      prevMoveY2 > prevMoveY1
        ? Math.abs(prevMoveY2 - prevMoveY1)
        : -Math.abs(prevMoveY2 - prevMoveY1);
  });

  const listenMouseup = listen(window, "mouseup", () => {
    listenMousemove();
    listenMouseup();
    prevMoveXValue = [0, 0];
    prevMoveYValue = [0, 0];
    isPressSpace.value = false;
  });
};
</script>

<template>
  <div
    id="go-chart-edit-layout"
    class="go-sketch-rule"
    @mousedown="mousedownHandleUnStop"
    @drop="dragHandle"
    @dragover="dragoverHandle"
    @dragenter="dragoverHandle"
  >
    <sketch-rule
      v-if="sketchRuleReDraw"
      :thick="thick"
      :scale="scale"
      :width="canvasBox().width"
      :height="canvasBox().height"
      :startX="startX"
      :startY="startY"
      :lines="lines"
      :palette="paletteStyle"
    >
    </sketch-rule>
    <div ref="$app" class="edit-screens" @scroll="handleScroll">
      <div
        ref="$container"
        class="edit-screen-container"
        :style="{ width: width * 2 + 'px' }"
      >
        <div
          ref="refSketchRuleBox"
          class="canvas"
          @mousedown="dragCanvas"
          :style="{ marginLeft: '-' + (canvasBox().width / 2 - 25) + 'px' }"
        >
          <div :style="{ pointerEvents: isPressSpace ? 'none' : 'auto' }">
            <!-- 插槽，放置画布 -->
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#go-chart-edit-layout {
  width: 100%;
  height: calc(100vh - 62px);
  background-color: #fff;
  // background-color: red;
}

.go-sketch-rule {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .edit-screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    user-select: none;
    padding-bottom: 0px;

    /* 滚动条样式 */
    /* firefox */
    scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
    scrollbar-width: thin;

    /* chrome */
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }
    /* 设置滚动条样式 */
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    /* 设置滚动条的滑块样式 */
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(144, 146, 152, 0.3);
    }
  }

  .edit-screen-container {
    position: absolute;
    height: v-bind("containerWidth");
    top: 0;
    left: 0;
  }

  .canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 50% 0;
    transform: translateY(-50%);

    &:hover {
      cursor: v-bind("cursorStyle");
    }

    &:active {
      cursor: crosshair;
    }
  }
}
</style>
