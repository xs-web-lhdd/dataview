<template>
  <!-- <v-chart
    ref="vChartRef"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    :update-options="{
      replaceMerge: replaceMergeArr,
    }"
    autoresize
  ></v-chart> -->
  <v-chart
    ref="vChartRef"
    :option="option"
    :manual-update="isPreview()"
    :update-options="{
      replaceMerge: replaceMergeArr,
    }"
    autoresize
  ></v-chart>
</template>

<script setup>
/**
 * * vue-echarts教程：http://events.jianshu.io/p/db5d5a949ed6
 */
import { ref, nextTick, computed, watch } from "vue";
import VChart from "vue-echarts";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { use } from "echarts/core";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 引入柱状图
import { BarChart } from "echarts/charts";
import config, { includes, seriesItem } from "./config";
import { mergeTheme } from "@/packages/public/chart";
// TODO:
import { useChartDataFetch } from "@/hooks";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { isPreview } from "@/utils";
// 引入数据集组件，直角坐标系组件，提示框组件，图例组件，组件后缀都为 Component
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
// 引入 lodash 库中的 判断是否是对象的函数
import isObject from "lodash/isObject";

// 这里的 themeSetting、themeColor 的作用是监听全局样式主题并进行设置，chartConfig 为图表的配置项数据
/**
 * 可以去 @/views/chart/ContentEdit/index.vue  查看里面 component 组件里面的传参即可知道，然后循环的是 componentList
 * 然后 componentList 内容是在拖拽或者双击时添加入的，可以查看 @/views/chart/ContentCharts/component/ChartsItemBox/index.vue 里面即可明白
 */
const props = defineProps({
  // themeSetting: {
  //   type: Object,
  //   required: true,
  // },
  // themeColor: {
  //   type: Object,
  //   required: true,
  // },
  chartConfig: {
    type: Object,
    required: true,
  },
});

// TODO: console.log('bar index.vue props --->>> ', props)

// 动态注册 ECharts 图表内容
use([
  DatasetComponent,
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
]);

const replaceMergeArr = ref();

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
});

// dataset 无法变更条数的补丁
// 若使用的是 Echarts 原生 dataset 控制需要解决一个bug
// 假设默认的 dadaset 渲染两个柱状图，从后台读取时返回一个柱状图的数据，只更新 dataset 是无效的，依然会渲染两个，需要手动修改 series

// 注：未使用 Echarts 原生 dataset 或此图表只能渲染一个实例，则不需要额外添加此监听
watch(
  () => props.chartConfig.option.dataset,
  // 监听新数据（例如：去后端请求到的 JSON 数据），然后更新图表数据
  (newData, oldData) => {
    // console.log('newData --->>> ', newData)

    try {
      // 如果新数据不是 JSON 对象，或者新数据里面没有 dimensions 属性就直接返回
      if (!isObject(newData) || !("dimensions" in newData)) {
        // window['$message'].error('得到的新数据不是对象或者对象里面缺失 dimensions 属性！')
        return;
      }
      // console.log('后续没有执行。。。')
      if (Array.isArray(newData?.dimensions)) {
        const seriesArr = [];
        for (let i = 0; i < newData.dimensions.length - 1; i++) {
          seriesArr.push(seriesItem);
        }
        replaceMergeArr.value = ["series"];
        props.chartConfig.option.series = seriesArr;
        nextTick(() => {
          replaceMergeArr.value = [];
        });
      }
    } catch (error) {
      console.log("error --->>> ", error);
    }
  },
  {
    deep: false,
  }
);

// 数据更新处理，使用 dataset 的 Eharts 图表不需要额外处理，hooks 会借助 vChartRef 自动更新
// 若每次更新需要修改其它属性，可添加回调函数处理，参考：src\packages\components\Charts\Pies\PieCircle
// const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore);
</script>
