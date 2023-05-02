<script setup>
import $Api from "@/api/index.js";
import { useRouter } from "vue-router";
import { useShowStore } from "@/store/modules/showStore/index.js";
import { previewHandle } from "./hooks/usePreview";
import { useSync } from "../main/hooks/useSync.js";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
// import { useChartLayoutStore } from "@/store/modules/chartLayoutStore/index.js";
import { setTitle } from "@/utils";

const store = useShowStore();
const chartEditStore = useChartEditStore();
const router = useRouter();
// const chartLayoutStore = useChartLayoutStore();
const { dataSyncUpdate } = useSync();
const handleCharts = () => {
  store.changeCharts();
};
const handleLayers = () => {
  store.changeLayers();
};
const handleConfiguration = () => {
  // 修改 store 里面状态
  store.changeConfiguration();
};
const handlePreview = () => {
  previewHandle();
};
const handleHome = () => {
  ElMessageBox.alert("默认保存项目后回主页", "回主页？", {
    confirmButtonText: "确定",
    callback: () => {
      handleSave();
      window["$message"].success("已保存！1s 后前往项目列表页~");
      setTimeout(() => {
        router.push("/project/items");
      }, 500);
    },
  });
};
const handleSave = () => {
  try {
    dataSyncUpdate();
    window["$message"].success("保存成功！");
  } catch (error) {
    window["$message"].error("保存失败！");
  }
};
const handleForward = () => {
  window["$message"].info("此功能尚未开放！请以后再试~");
};
const handleBack = () => {
  window["$message"].info("此功能尚未开放！请以后再试~");
};

const release = ref(false);

watchEffect(() => {
  release.value = chartEditStore.getProjectInfo.release || false;
});
const handlePublish = async () => {
  try {
    const res = await $Api.changeProjectReleaseApi({
      id: fetchRouteParamsLocation(),
      // 反过来
      state: release.value ? -1 : 1,
    });
    if (!release.value) {
      window["$message"].success(`发布成功!`);
    } else {
      window["$message"].success(`已取消发布`);
    }
    chartEditStore.setProjectInfo("release", !release.value);
  } catch (error) {}
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
    case "home":
      handleHome();
      break;
    case "save":
      handleSave();
      break;
    case "forward":
      handleForward();
      break;
    case "back":
      handleBack();
      break;
    case "publish":
      handlePublish();
  }
};

import { ref, computed, watchEffect, nextTick } from "vue";
import { ElMessageBox } from "element-plus";
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
} from "@element-plus/icons-vue";
import { fetchRouteParamsLocation } from "@/utils";

const dialogVisible = ref(false);

const inputInstRef = ref(null);
const focus = ref(false);
const title = ref(fetchRouteParamsLocation());
const comTitle = computed(() => {
  title.value = title.value.replace(/\s/g, "");
  const newTitle = title.value.length ? title.value : "新项目";
  setTitle(`工作台-${newTitle}`);
  chartEditStore.setEditCanvasConfig("projectName", newTitle);
  return newTitle;
});

watchEffect(() => {
  title.value = chartEditStore.getProjectInfo.projectName || "";
});
const handleFocus = () => {
  focus.value = true;
  nextTick(() => {
    inputInstRef.value && inputInstRef.value.focus();
  });
};
const handleBlur = async () => {
  focus.value = false;
  chartEditStore.setProjectInfo("projectName", title.value || "");
  const data = await $Api.updateProjectApi({
    id: fetchRouteParamsLocation(),
    projectName: title.value,
  });
  if (data) {
    window["$message"].success("更改项目名称成功！");
    dataSyncUpdate();
  } else {
    window["$message"].error("改项目名称失败！");
  }
};
const handleShowDialog = () => {
  dialogVisible.value = true;
};
const handleConfirmDialog = () => {
  ElMessageBox.confirm("你确定修改信息吗？")
    .then(() => {
      // TODO: 发送修改用户信息的 http
      // done();
      dialogVisible.value = false;
      window["$message"].success("修改信息成功！");
    })
    .catch(() => {
      // catch error
      dialogVisible.value = false;
      window["$message"].error("修改信息失败！");
    });
};
</script>

<template>
  <div class="header">
    <div class="header-left">
      <div class="icon icon-color" @click="handleIcon('home')">
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
      <div class="icon" @click="handleIcon('back')">
        <el-icon><Back /></el-icon>
      </div>
      <div class="mr-30 icon" @click="handleIcon('forward')">
        <el-icon><Right /></el-icon>
      </div>
      <div class="icon icon-color" @click="handleIcon('save')">
        <el-icon><Briefcase /></el-icon>
      </div>
    </div>
    <div class="header-center">
      <div class="operate">
        <div class="operate-icon">
          <el-icon style="margin-top: 7px"><Tools /></el-icon>
        </div>
        <div class="operate-projectname" @click="handleFocus">
          <div style="padding: 8px 15px; font-size: 14px">工作台 -</div>
          <div v-show="!focus">
            <el-button text> {{ comTitle }} </el-button>
          </div>
          <div v-show="focus" style="margin-top: 5px">
            <el-input
              v-model="title"
              placeholder="请输入项目名称"
              ref="inputInstRef"
              size="small"
              @blur="handleBlur"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="preview btn" @click="handleIcon('preview')">
        <el-icon class="preview-icon"><View /></el-icon>
        <span class="preview-text">预览</span>
      </div>
      <div class="published btn" @click="handleIcon('publish')">
        <el-icon class="published-icon"><SuccessFilled /></el-icon>
        <span class="published-text">{{
          release ? "取消发布" : "发布大屏"
        }}</span>
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
              <el-dropdown-item :icon="ArrowDown">刘豪</el-dropdown-item>
              <el-dropdown-item :icon="Check"
                >304214637@qq.com</el-dropdown-item
              >
              <el-dropdown-item :icon="CircleCheck"
                >17739229159</el-dropdown-item
              >
              <el-dropdown-item :icon="CirclePlus" @click="handleShowDialog"
                >修改用户信息</el-dropdown-item
              >
              <el-dropdown-item :icon="CirclePlusFilled"
                >退出登陆</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="个人信息" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmDialog">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
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
      // width: 300px;
      // padding: 20px 0;
      margin: 14px 0;
      &-projectname {
        margin-left: 10px;
        display: flex;
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
      width: 110px;
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
