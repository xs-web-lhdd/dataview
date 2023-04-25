<!-- 动态数据选项卡 -->

<script setup>
import { ref, reactive, computed } from "vue";
import ChartDataAjaxDialog from "../ChartDataAjaxDialog/index.vue";

const showModel = ref(false);
const request = reactive({
  requestContentType: "普通请求",
  requestHttpType: "PUT",
  requestOriginUrl: "https://localhost:4000",
  requestApi: "/login",
});

const requestUrl = computed(() => {
  return request.requestOriginUrl + request.requestApi;
});

const handleShowModel = () => {
  showModel.value = !showModel.value;
};
</script>

<template>
  <div class="ajax">
    <el-card class="ajax-card">
      <el-form>
        <el-form-item class="form-item" label="请求类型">
          <el-input disabled v-model="request.requestContentType" />
        </el-form-item>
        <el-form-item class="form-item" label="请求方式 ">
          <el-input disabled v-model="request.requestHttpType" />
        </el-form-item>
        <el-form-item class="form-item" label="请求根地址">
          <el-input disabled v-model="request.requestOriginUrl" />
        </el-form-item>
        <el-form-item class="form-item" label="请求相对地址">
          <el-input disabled v-model="request.requestApi" />
        </el-form-item>
        <el-form-item class="form-item" label="请求地址">
          <el-input disabled v-model="requestUrl" />
        </el-form-item>
      </el-form>
    </el-card>
    <div class="ajax-mask"></div>
    <div class="ajax-info" @click="handleShowModel">编辑配置</div>
  </div>
  <ChartDataAjaxDialog :showModel="showModel" :request="request" />
</template>

<style lang="scss" scoped>
.ajax {
  position: relative;
  z-index: 1;
  border-radius: 5px;
  border: 1px solid #fff;
  transition: border 0.1s ease-in-out;
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
