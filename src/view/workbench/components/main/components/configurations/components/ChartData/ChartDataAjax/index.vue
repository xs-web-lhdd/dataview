<!-- 动态数据选项卡 -->

<script setup>
import { ref, reactive, computed, toRefs, toRaw } from "vue";
import ChartDataAjaxDialog from "../ChartDataAjaxDialog/index.vue";
import ChartDataMatchingAndShow from "../ChartDataMatchingAndShow/index.vue";
import { useTargetData } from "../../../hooks/useTargetData.js";
import { customizeHttp } from "@/api/http.js";
import { newFunctionHandle } from "@/utils";

const { targetData, chartEditStore } = useTargetData();
const {
  requestOriginUrl,
  requestInterval: GlobalRequestInterval,
  requestIntervalUnit: GlobalRequestIntervalUnit,
} = toRefs(chartEditStore.getRequestGlobalConfig);

const showMatching = ref(false);
const requestShow = ref(false);

const requestContentType = computed(() => {
  if (targetData.value.request.requestContentType === 1) return "SQL请求";
  else return "普通请求";
});
const requestAllUrl = computed(
  () => requestOriginUrl.value + targetData.value.request.requestUrl
);
// 受否展示弹窗
const handleShowModel = () => {
  requestShow.value = true;
};
// 发送请求
const sendHandle = async () => {
  if (!targetData.value?.request) return;
  // loading.value = true;
  try {
    const res = await customizeHttp(
      toRaw(targetData.value.request),
      toRaw(chartEditStore.getRequestGlobalConfig)
    );
    // loading.value = false;
    console.log("sendHandle 获取的数据 --->>> ", res);
    // if (!res?.data && !targetData.value.filter)
    //   window["$message"].warning("您的数据不符合默认格式，请配置过滤器！");
    if (res) {
      // targetData.value.option.dataset = newFunctionHandle(
      //   res?.data,
      //   res,
      //   targetData.value.filter
      // );
      targetData.value.option.dataset = res;
      window["$message"].success("数据获取成功！");
      showMatching.value = true;
    }
  } catch (error) {
    // loading.value = false;
    console.log("sendHandle 的错误：", error);
    window["$message"].warning("数据异常，请检查参数！");
  }
};
</script>

<template>
  <div class="ajax">
    <el-card class="ajax-card">
      <el-form>
        <el-form-item class="form-item" label="请求类型">
          <el-input disabled v-model="requestContentType" />
        </el-form-item>
        <el-form-item class="form-item" label="请求方式 ">
          <el-input disabled v-model="targetData.request.requestHttpType" />
        </el-form-item>
        <el-form-item class="form-item" label="请求根地址">
          <el-input disabled v-model="requestOriginUrl" />
        </el-form-item>
        <el-form-item class="form-item" label="请求相对地址">
          <el-input disabled v-model="targetData.request.requestUrl" />
        </el-form-item>
        <el-form-item class="form-item" label="请求地址">
          <el-input disabled v-model="requestAllUrl" />
        </el-form-item>
      </el-form>
    </el-card>
    <div class="ajax-mask"></div>
    <div class="ajax-info" @click="handleShowModel">编辑配置</div>
  </div>
  <div style="display: flex; margin-bottom: 20px">
    <div>测试：</div>
    <el-button type="primary" @click="sendHandle">发送请求？</el-button>
  </div>

  <ChartDataMatchingAndShow :show="showMatching" :ajax="true" />

  <ChartDataAjaxDialog
    v-model:modelShow="requestShow"
    :targetData="targetData"
    @sendHandle="sendHandle"
  />
</template>

<style lang="scss" scoped>
.ajax {
  position: relative;
  z-index: 1;
  border-radius: 5px;
  border: 1px solid #fff;
  transition: border 0.1s ease-in-out;
  margin-bottom: 20px;
  &-card {
    padding: 10px !important;
    .form-item {
      margin-bottom: 12px;
    }
    .form-item:last-child {
      margin-bottom: 0;
    }
  }
  &-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
  &-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    opacity: 0;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #409eff;
    color: #fff;
    border-radius: 5px;
  }
}
.ajax:hover {
  border: 1px solid #409eff;
  // filter: blur(0.8px);
  .ajax-mask {
    background-color: rgba(#4093ff, 0.3);
  }
  .ajax-info {
    cursor: pointer;
    opacity: 1;
    filter: inherit !important;
  }
}
:deep(.el-card__body) {
  padding: 10px 5px !important;
}
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
