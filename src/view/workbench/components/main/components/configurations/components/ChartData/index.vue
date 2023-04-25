<!-- 数据设置选项卡 -->

<script setup>
import ChartDataStatic from "./ChartDataStatic/index.vue";
import ChartDataAjax from "./ChartDataAjax/index.vue";
import { ref } from "vue";

// 选项
const selectOptions = [
  {
    label: "静态数据",
    value: 0,
  },
  {
    label: "动态请求",
    value: 1,
  },
];

const selectValue = ref(0);
</script>

<template>
  <el-form>
    <el-form-item label="获取数据方式">
      <el-select v-model="selectValue" class="m-2" placeholder="Select">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <ChartDataStatic v-if="selectValue == 0" />
  <ChartDataAjax v-if="selectValue == 1" :show="false" />
</template>

<style lang="scss" scoped></style>
