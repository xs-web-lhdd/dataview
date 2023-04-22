<!-- 图表盒子 -->

<script setup>
import { watch } from "vue";
import omit from "lodash/omit";
import ChartGlobalImage from "@/components/ChartGlobalImage/index.vue";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { componentInstall, JSONStringify } from "@/utils";
import {
  fetchChartComponent,
  fetchConfigComponent,
  createComponent,
} from "@/packages";

const chartEditStore = useChartEditStore();

console.log(chartEditStore.componentList);

// TODO: 测试 store 里面的 componentList 有没有更新
// watch(
//   () => chartEditStore.componentList,
//   () => {
//     console.log(chartEditStore.componentList);
//   },
//   {
//     deep: true,
//     immediate: true,
//   }
// );

const props = defineProps({
  listOptions: {
    type: Object,
    default: () => {},
  },
});

// 开始拖拽：
const dragStartHandle = (e, chart) => {
  console.log("拖拽开始！");
  // console.log("e --->>> ", e);
  // console.log("chart", chart);
  // 动态注册图表组件
  // 将拖动的组件全局安装，安装对应的图表组件和图表配置组件，将组件注册成全局组件
  componentInstall(chart.chartKey, fetchChartComponent(chart));
  componentInstall(chart.conKey, fetchConfigComponent(chart));
  // 将配置项绑定到拖拽属性上
  e.dataTransfer.setData("ChartData", JSONStringify(omit(chart, ["image"])));
  // 修改状态
  chartEditStore.setEditCanvas("isCreate", true);
};
// 结束拖拽：
const dragendHandle = () => {
  chartEditStore.setEditCanvas("isCreate", false);
  console.log("拖拽结束！");
};
// 双击：
const dblclickHandle = async (chart) => {
  console.log("双击后的操作！！！");
  try {
    // 开始页面顶部进度条加载
    // loadingStart();
    // 动态注册图表组件
    componentInstall(chart.chartKey, fetchChartComponent(chart));
    componentInstall(chart.conKey, fetchConfigComponent(chart));
    // 创建新图表组件
    let newComponent = await createComponent(chart);
    // 添加，将新创建的组件添加到组件队列里面
    chartEditStore.addComponentList(newComponent, false, true);
    // 选中
    chartEditStore.setTargetSelectChart(newComponent.id);
    // 结束页面顶部进度条加载
    // loadingFinish();
  } catch (error) {
    // loadingError();
    console.log(error);

    window["$message"].warning(`图表正在研发中, 敬请期待...`);
  }
};
</script>

<template>
  <div class="box">
    <div
      class="box-item"
      v-for="chart in props.listOptions"
      :key="chart.key"
      draggable
      @dragstart="dragStartHandle($event, chart)"
      @dragend="dragendHandle"
      @dblclick="dblclickHandle(chart)"
    >
      <div class="box-item-header">
        <i class="iconfont icon-red">&#xe608;</i>
        <i class="iconfont icon-blue">&#xe608;</i>
        <i class="iconfont icon-green">&#xe608;</i>
      </div>
      <div class="box-item-center">
        <ChartGlobalImage :chartConfig="chart" />
      </div>
      <div class="box-item-footer">{{ chart.title }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-bottom: 5px;
  box-sizing: border-box;
  &-item {
    width: 44%;
    height: 80px;
    max-width: 180px;
    overflow: hidden;
    border-radius: 6px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    background-color: #eee;
    &-header {
      height: 14px;
      font-size: 16px;
    }
    &-center {
      height: calc(100% - 30px);
      background-color: #fff;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 90%;
        border-radius: 5px;
        transition: all 0.1s ease-in-out;
      }
      img:hover {
        width: 95%;
        height: 95%;
      }
    }
    &-footer {
      height: 16px;
      color: #767c82;
      font-size: 12px;
      line-height: 16px;
      text-indent: 4px;
    }
  }
  &-item:nth-child(2n) {
    margin: 5px 5px 0 3px;
  }
  &-item:nth-child(2n + 1) {
    margin: 5px 3px 0 5px;
  }
  // & > *:last-child:nth-child(2n + 1) {
  //   /* 选中最后一个元素中的奇数元素 */
  // }
}
</style>
