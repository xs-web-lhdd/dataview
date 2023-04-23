<!-- 画布主体 -->

<script setup>
import EditRange from "./components/editRange/index.vue";
import { useLayout } from "../../hooks/useLayout";
useLayout();
</script>

<template>
  <div class="go-chart-edit-content edit-canvas" id="go-chart-edit-content">
    <EditRange></EditRange>
  </div>
</template>

<style lang="scss" scoped>
.edit-canvas {
  border-radius: 10px;
  overflow: hidden;
  min-width: 400px !important;
  background-color: aquamarine;
  transition: all 0.2s linear;
}
</style>
