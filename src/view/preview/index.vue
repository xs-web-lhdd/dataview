<template>
  <div
    :class="`go-preview ${localStorageInfo.editCanvasConfig.previewScaleType}`"
  >
    <template v-if="showEntity">
      <!-- 实体区域 -->
      <div ref="entityRef" class="go-preview-entity">
        <!-- 缩放层 -->
        <div ref="previewRef" class="go-preview-scale">
          <!-- 展示层 -->
          <div :style="previewRefStyle" v-if="show">
            <!-- 渲染层（关键组件！） -->
            <PreviewRenderList
              :localStorageInfo="localStorageInfo"
            ></PreviewRenderList>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 缩放层 -->
      <div ref="previewRef" class="go-preview-scale">
        <!-- 展示层 -->
        <div :style="previewRefStyle" v-if="show">
          <!-- 渲染层 -->
          <PreviewRenderList
            :localStorageInfo="localStorageInfo"
          ></PreviewRenderList>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
/**
 * * 预览页面
 */
import { computed } from "vue";
import PreviewRenderList from "./components/PreviewRenderList/index.vue";
import { getFilterStyle, setTitle } from "@/utils";
import { getEditCanvasConfigStyle, getSessionStorageInfo } from "./utils";
import { useComInstall } from "./hooks/useComponentInstall.hook";
import { useScale } from "./hooks/useScale.hook";
import { useStore } from "./hooks/useStore.hook";
import { PreviewScaleEnum } from "@/enums/styleEnum.js";

const localStorageInfo = getSessionStorageInfo();
// 修改窗口标题
setTitle(`预览-${localStorageInfo.editCanvasConfig.projectName}`);

const previewRefStyle = computed(() => {
  return {
    ...getEditCanvasConfigStyle(localStorageInfo.editCanvasConfig),
    ...getFilterStyle(localStorageInfo.editCanvasConfig),
  };
});

const showEntity = computed(() => {
  const type = localStorageInfo.editCanvasConfig.previewScaleType;
  return (
    type === PreviewScaleEnum.SCROLL_Y || type === PreviewScaleEnum.SCROLL_X
  );
});

useStore(localStorageInfo);
const { entityRef, previewRef } = useScale(localStorageInfo);
const { show } = useComInstall(localStorageInfo);
</script>

<style lang="scss" scoped>
.go-preview {
  position: relative;
  height: 100vh;
  width: 100vw;
  // @include background-image("background-image");
  &.fit,
  &.full {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .go-preview-scale {
      transform-origin: center center;
    }
  }
  &.scrollY {
    overflow-x: hidden;
    .go-preview-scale {
      transform-origin: left top;
    }
  }
  &.scrollX {
    overflow-y: hidden;
    .go-preview-scale {
      transform-origin: left top;
    }
  }
  .go-preview-entity {
    overflow: hidden;
  }
}
</style>
