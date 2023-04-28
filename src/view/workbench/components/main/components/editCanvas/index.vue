<!-- 画布主体 -->

<script setup>
// import { watch } from "vue";
import EditRange from "./components/editRange/index.vue";
import { useContextMenu } from "../../hooks/useContentMenu.js";
import { useLayout } from "../../hooks/useLayout";
// import { useShowStore } from "@/store/modules/showStore/index.js";

useLayout();
const { handleContextMenu } = useContextMenu();
// const showStore = useShowStore();

// watch(
//   () => showStore.configurationShow,
//   () => {
//     console.log("侧边栏变化啦");
//     useLayout();
//   },
//   {
//     deep: true,
//     immediate: true,
//   }
// );
</script>

<template>
  <!-- 画布主体 -->
  <div
    class="go-chart-edit-content edit-canvas"
    id="go-chart-edit-content"
    @contextmenu="handleContextMenu"
  >
    <!-- 展示 -->
    <EditRange></EditRange>
  </div>
</template>

<style lang="scss" scoped>
.edit-canvas {
  border-radius: 10px;
  overflow: hidden;
  min-width: 400px !important;
  // background-color: aquamarine;
  transition: all 0.2s linear;
}
</style>
