<!-- 画布配置 -->

<script setup>
import { ref, reactive } from "vue";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { backgroundImageSize } from "@/settings/designSetting";
import { FileTypeEnum } from "@/enums/fileTypeEnum.js";

const chartEditStore = useChartEditStore();
const canvasConfig = chartEditStore.getEditCanvasConfig;
const editCanvas = chartEditStore.getEditCanvas;

const color = ref("409EFF");
const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
const value5 = ref(0);
const value6 = ref(true);
const activeNames = ref(1);
// 上传图片前置处理
const beforeUploadHandle = async (file) => {
  console.log(file);
  const type = file.type;
  const size = file.size;

  if (size > 1024 * 1024 * backgroundImageSize) {
    window["$message"].warning(
      `图片超出 ${backgroundImageSize}M 限制，请重新上传！`
    );
    return false;
  }
  if (
    type !== FileTypeEnum.PNG &&
    type !== FileTypeEnum.JPEG &&
    type !== FileTypeEnum.GIF
  ) {
    window["$message"].warning("文件格式不符合，请重新上传！");
    return false;
  }
  return true;
};
</script>

<template>
  <el-form>
    <el-form-item label="宽度">
      <el-input-number v-model="canvasConfig.width" />
    </el-form-item>
    <el-form-item label="高度">
      <el-input-number v-model="canvasConfig.height" />
    </el-form-item>
    <el-form-item>
      <el-upload
        drag
        action="https://run.mocky.io/"
        :before-upload="beforeUploadHandle"
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
      <el-color-picker v-model="canvasConfig.background" show-alpha />
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
</template>

<style lang="scss" scoped>
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
// 改 elementPlus 相关的 css
:deep(.el-color-picker__trigger) {
  width: 150px;
}
:deep(.el-collapse-item) {
  width: 300px;
}
:deep(.el-card__body) {
  padding: 12px;
}

// 滑块相关的 css
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
