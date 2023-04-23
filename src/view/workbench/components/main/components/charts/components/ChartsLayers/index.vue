<!-- 图层列表页面 -->

<script setup>
import { ref, watch, computed } from "vue";
import Draggable from "vuedraggable";
import cloneDeep from "lodash/cloneDeep";
import LayerListItem from "./components/LayersListItem/index.vue";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { useContextMenu } from "../../../../hooks/useContentMenu.js";

const chartEditStore = useChartEditStore();
const { handleContextMenu, onClickOutSide } = useContextMenu();

const layerList = ref([]);

// 逆序展示
const reverseList = computed(() => {
  const list = cloneDeep(chartEditStore.getComponentList);
  return list.reverse();
});

watch(
  () => reverseList.value,
  (newValue) => {
    layerList.value = newValue;
  }
);

// 移动结束处理
const onMoveCallback = (val) => {
  const { oldIndex, newIndex } = val.moved;
  if (newIndex - oldIndex > 0) {
    // 从上往下
    const moveTarget = chartEditStore.getComponentList.splice(
      -(oldIndex + 1),
      1
    )[0];
    chartEditStore.getComponentList.splice(-newIndex, 0, moveTarget);
  } else {
    // 从下往上
    const moveTarget = chartEditStore.getComponentList.splice(
      -(oldIndex + 1),
      1
    )[0];
    if (newIndex === 0) {
      chartEditStore.getComponentList.push(moveTarget);
    } else {
      chartEditStore.getComponentList.splice(-newIndex, 0, moveTarget);
    }
  }
};
// 进入事件
const mouseenterHandle = (item) => {
  chartEditStore.setTargetHoverChart(item.id);
};

// 移出事件
const mouseleaveHandle = (item) => {
  chartEditStore.setTargetHoverChart(undefined);
};

// 点击事件
const mousedownHandle = (e, item) => {
  const MouseEventButton = {
    LEFT: 1,
    RIGHT: 2,
  };
  onClickOutSide();
  // 若此时按下了 CTRL, 表示多选
  const id = item.id;
  if (e.buttons === MouseEventButton.LEFT && window.$KeyboardActive?.ctrl) {
    // 若已选中，则去除
    if (chartEditStore.targetChart.selectId.includes(id)) {
      const exList = chartEditStore.targetChart.selectId.filter(
        (e) => e !== id
      );
      chartEditStore.setTargetSelectChart(exList);
    } else {
      chartEditStore.setTargetSelectChart(id, true);
    }
    return;
  }
  chartEditStore.setTargetSelectChart(id);
};

// 操作枚举
const MenuEnum = {
  // 移动
  ARROW_UP: "up",
  ARROW_RIGHT: "right",
  ARROW_DOWN: "down",
  ARROW_LEFT: "left",
  // 删除
  DELETE: "delete",
  // 复制
  COPY: "copy",
  // 剪切
  CUT: "cut",
  // 粘贴
  PARSE: "parse",
  // 置顶
  TOP: "top",
  // 置底
  BOTTOM: "bottom",
  // 上移
  UP: "up",
  // 下移
  DOWN: "down",
  // 清空剪贴板
  CLEAR: "clear",
  // 成组
  GROUP: "group",
  // 解组
  UN_GROUP: "unGroup",
  // 后退
  BACK: "back",
  // 前进
  FORWORD: "forward",
  // 保存
  SAVE: "save",
  // 锁定
  LOCK: "lock",
  // 解除锁定
  UNLOCK: "unLock",
  // 隐藏
  HIDE: "hide",
  // 显示
  SHOW: "show",
};

// 右键事件
const optionsHandle = (targetList, allList, targetInstance) => {
  console.log("图层-触发右键事件了！！！");
  // 多选处理
  if (chartEditStore.getTargetChart.selectId.length > 1) {
    return allList.filter((i) =>
      [MenuEnum.GROUP, MenuEnum.DELETE].includes(i.key)
    );
  }
  const statusMenuEnums = [];
  if (targetInstance.status.lock) {
    statusMenuEnums.push(MenuEnum.LOCK);
  } else {
    statusMenuEnums.push(MenuEnum.UNLOCK);
  }
  if (targetInstance.status.hide) {
    statusMenuEnums.push(MenuEnum.HIDE);
  } else {
    statusMenuEnums.push(MenuEnum.SHOW);
  }
  return targetList.filter((i) => !statusMenuEnums.includes(i.key));
};
</script>

<template>
  <div class="layer">
    <div class="layer-header">
      <div>
        <span style="vertical-align: middle; margin-right: 5px">图层</span>
        <el-icon style="vertical-align: middle"><Coin /></el-icon>
      </div>
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="layer-content">
      <el-scrollbar class="scrollbar">
        <div v-if="reverseList.length === 0" class="layer-content-tip">
          <el-text type="info">暂无图层~</el-text>
        </div>
        <!-- https://github.com/SortableJS/vue.draggable.next -->
        <Draggable
          item-key="id"
          v-model="layerList"
          ghostClass="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element }">
            <LayerListItem
              :componentData="element"
              @mousedown="mousedownHandle($event, element)"
              @mouseenter="mouseenterHandle(element)"
              @mouseleave="mouseleaveHandle(element)"
              @contextmenu="handleContextMenu($event, element, optionsHandle)"
            ></LayerListItem>
          </template>
        </Draggable>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layer {
  width: 100%;
  height: 100%;
  &-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #e5e6eb;
    border-bottom: 2px solid #fff;
    color: #333;
  }
  &-content {
    height: calc(100% - 42px);
    background-color: #f2f3f5;
    &-tip {
      text-align: center;
      margin-top: 5px;
    }
  }
}
</style>
