<!-- 右边配置栏 -->

<script setup>
import { ref, reactive } from "vue";
import { useShowStore } from "@/store/modules/showStore/index.js";
const store = useShowStore();
const globalActiveName = ref("global");
// const targetActiveName = ref('')
const selectTarget = ref(false);
const width = ref(1000);
const height = ref(900);
const color = ref("409EFF");
const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
const value5 = ref(0);
const value6 = ref(true);
const activeNames = ref(1);
const formInline = reactive({
  user: "",
  region: "",
});
const uploadSuccess = () => {
  alert("上传成功呢！");
};
</script>

<template>
  <aside class="configuration">
    <div :class="store.configurationShow ? 'content content-show' : 'content'">
      <el-tabs
        v-if="!selectTarget"
        v-model="globalActiveName"
        type="border-card"
      >
        <el-tab-pane label="全局页面配置" name="global">
          <!-- 表单！ -->
          <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline"> -->
          <el-form :model="formInline" class="demo-form-inline">
            <el-form-item label="宽度">
              <el-input-number v-model="width" />
            </el-form-item>
            <el-form-item label="高度">
              <el-input-number v-model="height" />
            </el-form-item>
            <el-form-item>
              <el-upload
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                @on-success="uploadSuccess"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  拖拽背景图片到这里或 <em>点击去上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    背景图需小于 5M，格式为 png/jpg/gif 的文件
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item label="背景颜色">
              <el-color-picker v-model="color" show-alpha />
            </el-form-item>
            <el-form-item>
              <el-collapse v-model="activeNames">
                <el-collapse-item title="滤镜" name="1">
                  <el-switch
                    v-model="value6"
                    class="mb-2"
                    active-text="开启滤镜"
                    inactive-text="关闭滤镜"
                  />
                  <!-- 进度条 -->
                  <div class="slider-demo-block">
                    <span class="demonstration">色相</span>
                    <el-slider v-model="value1" />
                  </div>
                  <div class="slider-demo-block">
                    <span class="demonstration">饱和度</span>
                    <el-slider v-model="value2" />
                  </div>
                  <div class="slider-demo-block">
                    <span class="demonstration">对比度</span>
                    <el-slider v-model="value3" />
                  </div>
                  <div class="slider-demo-block">
                    <span class="demonstration">亮度</span>
                    <el-slider v-model="value4" />
                  </div>
                  <div class="slider-demo-block">
                    <span class="demonstration">透明度</span>
                    <el-slider v-model="value5" />
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-form-item>

            <!-- 卡片 -->
            <div class="theme">
              <div class="theme-title">主题颜色</div>
              <div class="theme-list">
                <el-card class="card" v-for="item in 10">
                  <div style="display: flex; justify-content: space-between">
                    <el-text
                      style="
                        max-width: 55px;
                        width: 55px;
                        vertical-align: middle;
                        display: inline-block;
                      "
                      truncated
                      >明亮</el-text
                    >
                    <span
                      style="
                        display: inline-block;
                        background-color: aquamarine;
                        width: 20px;
                        height: 20px;
                        border-radius: 5px;
                        vertical-align: middle;
                        /* margin: 0 8px; */
                      "
                      v-for="item in 6"
                    ></span>
                  </div>
                </el-card>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-tabs
        v-if="selectTarget"
        v-model="globalActiveName"
        type="border-card"
      >
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.configuration {
  .content {
    width: 350px;
    background-color: aquamarine;
    width: 0px;
    border-left: none !important;
    transition: all 0.2s linear;
    &-show {
      width: 350px;
      border-left: 1px solid #dcdfe6 !important;
    }
  }
  .theme {
    &-title {
      color: var(--el-color-primary);
      text-align: center;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      margin-bottom: 5px;
    }
    &-list {
      .card {
        margin-bottom: 10px;
        cursor: pointer;
      }
      .card:hover {
        box-shadow: 0px 0px 6px rgba(64, 158, 255, 0.9);
      }
    }
  }
}
:deep(.el-tabs__nav) {
  float: none !important;
  justify-content: center;
}
:deep(.el-color-picker__trigger) {
  width: 150px;
}
:deep(.el-collapse-item) {
  width: 300px;
}
:deep(.el-card__body) {
  padding: 12px;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  // line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 75%;
}
</style>
