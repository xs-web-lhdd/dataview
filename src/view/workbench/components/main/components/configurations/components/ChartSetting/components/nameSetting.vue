<!-- 右侧配置栏下 名称 部分 -->

<template>
  <el-form>
    <el-form-item label="图表名称：">
      <el-input v-model="chartConfig.title" @blur="handleBlur" />
    </el-form-item>
  </el-form>
</template>

<script setup>
const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

let valueCatch = "";

const handleFocus = () => {
  valueCatch = props.chartConfig.title;
};
const handleBlur = () => {
  if (!props.chartConfig.title.length) {
    window["$message"].warning("请输入至少一个字符!");
    props.chartConfig.title = valueCatch;
  }
};
</script>

<style lang="scss" scoped></style>
