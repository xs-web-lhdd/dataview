<!-- 画布主体 -->

<script setup>
import { useLayout } from "../../hooks/useLayout";
useLayout();
</script>

<template>
  <div class="go-chart-edit-content edit-canvas" id="go-chart-edit-content">
    画布
  </div>
</template>

<style lang="scss" scoped>
.edit-canvas {
  border-radius: 10px;
  overflow: hidden;
  background-color: aquamarine;
  transition: all 0.2s linear;
}
</style>
