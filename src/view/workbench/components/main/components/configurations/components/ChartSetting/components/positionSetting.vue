<!-- 右侧配置栏下 位置 部分 -->

<template>
  <el-form>
    <el-form-item label="图表位置："> </el-form-item>
    <el-form-item label="上">
      <el-input-number v-model="chartAttr.x" :min="0" size="small" />
    </el-form-item>
    <el-form-item label="左">
      <el-input-number v-model="chartAttr.y" :min="0" size="small" />
    </el-form-item>
  </el-form>
  <el-divider></el-divider>
</template>

<script setup>
const props = defineProps({
  canvasConfig: {
    type: Object,
    required: true,
  },
  chartAttr: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
