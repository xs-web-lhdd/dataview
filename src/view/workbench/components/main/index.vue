<script setup>
//  左侧图表部分
import Charts from "./components/charts/index.vue";
// 右侧图表配置项部分
import Configurations from "./components/configurations/index.vue";
// 中间编辑部分
import EditRuler from "./components/editRuler/index.vue";
// 中间画布部分
import EditCanvas from "./components/editCanvas/index.vue";
const packages = [
  {
    label: "图表",
    icon: "xxx",
    children: [
      {
        label: "所有",
        charts: [
          {
            name: "柱状图",
            img: "xxxxx",
          },
          {
            name: "横向柱状图",
            img: ",,,,",
          },
        ],
      },
      {
        label: "饼图",
        charts: [
          {
            name: "饼图",
            img: "xxxxx",
          },
          {
            name: "饼图-环型",
            img: ",,,,",
          },
        ],
      },
    ],
  },
  {
    label: "信息",
    icon: "message",
    children: [
      {
        label: "文本",
        children: [
          {
            label: "文本",
            img: "xxx",
          },
          {
            label: "渐变文字",
            img: "xxx",
          },
        ],
      },
      {
        label: "更多",
        children: [
          {
            label: "图片",
            img: "xxx",
          },
          {
            label: "轮播图",
            img: "xxx",
          },
        ],
      },
    ],
  },
];
// import { getPackagesList } from "./hooks/useAside";
// console.log(getPackagesList);
</script>

<template>
  <div class="main">
    <div class="left">
      <!-- charts 列表部分 -->
      <Charts />
      <!-- 图层部分 -->
    </div>
    <div class="center">
      <EditRuler>
        <EditCanvas />
      </EditRuler>
    </div>
    <div class="right">
      <el-scrollbar class="scrollbar">
        <!-- 画布以及右侧配置页 -->
        <Configurations />
      </el-scrollbar>
    </div>
  </div>
  <!-- 右键 -->

  <!-- <div class="main">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div> -->
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  height: calc(100vh - 62px);
  overflow: hidden;
  .left {
    // align-self: flex-start;
  }
  .center {
    flex: 1;
    background-color: #409eff;
  }
  .right {
    height: calc(100vh - 62px);
  }
}
</style>
