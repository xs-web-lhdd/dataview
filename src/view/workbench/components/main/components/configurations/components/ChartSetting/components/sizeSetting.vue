<!-- 右侧配置栏下 尺寸 部分 -->

<template>
  <el-form>
    <el-form-item label="图表尺寸："> </el-form-item>
    <el-form-item label="宽度">
      <el-input-number v-model="chartAttr.w" size="small" />
    </el-form-item>
    <el-form-item label="高度">
      <el-input-number v-model="chartAttr.h" size="small" />
    </el-form-item>
  </el-form>
</template>

<script setup>
const props = defineProps({
  chartAttr: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
