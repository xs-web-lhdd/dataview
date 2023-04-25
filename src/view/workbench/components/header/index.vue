<script setup>
import { useShowStore } from "@/store/modules/showStore/index.js";
import { previewHandle } from "./hooks/usePreview";

const store = useShowStore();
const handleCharts = () => {
  store.changeCharts();
};
const handleLayers = () => {
  store.changeLayers();
};
const handleConfiguration = () => {
  store.changeConfiguration();
};
const handlePreview = () => {
  previewHandle();
};
const handleIcon = (icon) => {
  switch (icon) {
    case "charts":
      handleCharts();
      break;
    case "layers":
      handleLayers();
      break;
    case "configuration":
      handleConfiguration();
      break;
    case "preview":
      handlePreview();
      break;
  }
};
</script>

<template>
  <div class="header">
    <div class="header-left">
      <div class="icon">
        <el-icon><HomeFilled /></el-icon>
      </div>
      <div
        :class="store.chartsShow ? 'icon icon-color' : 'icon'"
        @click="handleIcon('charts')"
      >
        <el-icon><Histogram /></el-icon>
      </div>
      <div
        :class="store.layersShow ? 'icon icon-color' : 'icon'"
        @click="handleIcon('layers')"
      >
        <el-icon><Coin /></el-icon>
      </div>
      <div
        :class="
          store.configurationShow ? 'mr-30 icon icon-color' : 'mr-30 icon'
        "
        @click="handleIcon('configuration')"
      >
        <el-icon><Operation /></el-icon>
      </div>
      <div class="icon">
        <el-icon><Back /></el-icon>
      </div>
      <div class="mr-30 icon">
        <el-icon><Right /></el-icon>
      </div>
      <div class="icon">
        <el-icon><Briefcase /></el-icon>
      </div>
    </div>
    <div class="header-center">
      <div class="operate">
        <div class="operate-icon">
          <el-icon><Tools /></el-icon>
        </div>
        <div class="operate-projectname">工作台 - 刘豪的第一个图表</div>
      </div>
    </div>
    <div class="header-right">
      <div class="preview btn" @click="handleIcon('preview')">
        <el-icon class="preview-icon"><View /></el-icon>
        <span class="preview-text">预览</span>
      </div>
      <div class="published btn">
        <el-icon class="published-icon"><SuccessFilled /></el-icon>
        <span class="published-text">发布</span>
      </div>
      <div class="language btn">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="语言切换"
          placement="bottom"
        >
          <el-icon><Flag /></el-icon>
        </el-tooltip>
      </div>
      <div class="theme btn">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="主题"
          placement="bottom"
        >
          <el-icon><Moon /></el-icon>
        </el-tooltip>
      </div>
      <div class="userinfo btn">
        <el-dropdown placement="bottom">
          <div class="userinfo-avatar">
            <img src="../../../../assets/images/avatar.png" alt="" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
              <el-dropdown-item>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 60px;
  border-bottom: 1px solid rgb(239, 239, 245);
  display: flex;
  &-left {
    flex: 1;
    height: 100%;
    margin-left: 20px;
    display: flex;
    .icon {
      width: 34px;
      height: 28px;
      border: 1px solid #999;
      border-radius: 5px;
      padding: 5px 8px;
      box-sizing: border-box;
      color: #3333;
      margin: 15px 5px 15px 5px;
      cursor: pointer;
      transition: all 0.2s linear;
      &-color {
        color: #409eff;
        border: 1px solid #409eff;
      }
    }
  }
  &-center {
    flex: 1;
    height: 100%;
    .operate {
      display: flex;
      margin: 0 auto;
      width: 300px;
      padding: 20px 0;
      &-projectname {
        margin-left: 10px;
      }
    }
  }
  &-right {
    height: 100%;
    // background-color: #67c23a;
    display: flex;
    .preview {
      position: relative;
      border-radius: 5px;
      width: 80px;
      height: 38px;
      border: 1px solid #409eff;
      margin: 10px 20px 10px 0;
      padding: 3px;
      box-sizing: border-box;
      cursor: pointer;
      &-icon {
        position: absolute;
        top: 10px;
        left: 8px;
      }
      &-text {
        position: absolute;
        top: 10px;
        left: 30px;
      }
    }
    .published {
      position: relative;
      border-radius: 5px;
      width: 80px;
      height: 38px;
      border: 1px solid #409eff;
      margin: 10px 20px 10px 0;
      padding: 3px;
      box-sizing: border-box;
      &-icon {
        position: absolute;
        top: 10px;
        left: 8px;
      }
      &-text {
        position: absolute;
        top: 10px;
        left: 30px;
      }
    }
    .language {
      width: 34px;
      height: 28px;
      border: 1px solid #409eff;
      border-radius: 5px;
      padding: 5px 8px;
      box-sizing: border-box;
      color: #409eff;
      margin: 15px 5px 15px 5px;
    }
    .theme {
      width: 34px;
      height: 28px;
      border: 1px solid #409eff;
      border-radius: 5px;
      padding: 5px 8px;
      box-sizing: border-box;
      color: #409eff;
      margin: 15px 5px 15px 5px;
    }
    .userinfo {
      width: 40px;
      height: 40px;
      background-color: red;
      margin: 5px 20px 5px 10px;
      border-radius: 50%;
      &-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .btn {
      cursor: pointer;
    }
  }
}
</style>
