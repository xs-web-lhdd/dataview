<!-- 项目列表页 -->

<template>
  <div class="main">
    <div class="item" v-for="item in projectList">
      <div class="operate">
        <div class="publish">
          <div v-if="item.state == 1" style="position: relative">
            <el-icon style="color: #67c23a; position: absolute; top: 1px"
              ><SuccessFilled
            /></el-icon>
            <span style="font-size: 14px; margin-left: 18px; color: #999"
              >已发布</span
            >
          </div>
          <div v-else style="position: relative">
            <el-icon style="color: #f56c6c; position: absolute; top: 1px"
              ><CircleCloseFilled
            /></el-icon>
            <span style="font-size: 14px; margin-left: 18px; color: #999"
              >未发布</span
            >
          </div>
        </div>
        <div class="icon" @click="handOperate('delete', item.id)">
          <el-icon style="color: #f56c6c"><Delete /></el-icon>
        </div>
        <div class="icon" @click="handOperate('view', item.id)">
          <el-icon style="color: #67c23a"><View /></el-icon>
        </div>
      </div>
      <div class="img">
        <img :src="item.indexImage" alt="" />
      </div>
      <div class="option">
        <el-text type="primary" class="option-text mx-1" size="large">{{
          item.projectName
        }}</el-text>
        <div class="option-edit">
          <el-tooltip
            class="box-item"
            effect="light"
            content="编辑"
            placement="top-start"
          >
            <el-button type="primary" plain @click="handleEdit(item.id)">
              <el-icon><Edit /></el-icon>
            </el-button>
          </el-tooltip>
        </div>

        <el-dropdown @command="(key) => handleSelect(key, item.id)">
          <el-button type="primary" plain>
            <el-icon><More /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in selectList"
                :key="item.label"
                :icon="item.icon"
                :command="item.command"
                >{{ item.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 创建新项目 -->
    <div class="create item">
      <div class="create-icon" @click="handleCreate">
        <el-tooltip
          class="box-item"
          effect="light"
          content="没有项目？创建一个吧！"
          placement="top-start"
        >
          <el-icon size="150" style="color: #409eff"><Plus /></el-icon>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import $Api from "@/api/index.js";
import { useSystemStore } from "@/store/modules/systemStore/index.js";
import { getUUID, fetchPathByName, routerTurnByPath } from "@/utils";
import {
  ArrowDown,
  DocumentCopy,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";

const systemStore = useSystemStore();
const router = useRouter();
const projectList = ref([]);
const createUserId = systemStore.userInfo.userId;

const selectList = [
  {
    icon: ArrowDown,
    label: "预览",
    command: "preview",
  },
  {
    icon: DocumentCopy,
    label: "克隆",
    command: "clone",
  },
  {
    icon: CircleCheck,
    label: "重命名",
    command: "rename",
  },
  {
    icon: CirclePlusFilled,
    label: "取消发布",
    command: "cancel",
  },
  {
    icon: CirclePlus,
    label: "下载",
    command: "download",
  },
  {
    icon: Plus,
    label: "删除",
    command: "delete",
  },
];

const handleEdit = (projectId) => {
  const path = `http://localhost:4000/#/workbench/${projectId}`;
  window.open(path, "_blank");
};
const handleCreate = async () => {
  try {
    const res = await $Api.createProjectApi({
      // 项目名称：
      projectName: getUUID(),
      // remarks
      remarks: null,
      // 图片地址
      indexImage: null,
      // 用户id
      createUserId,
    });
    if (res) {
      window["$message"].success("创建项目成功！");
      const { id } = res;
      const path = `http://localhost:4000/#/workbench/${id}`;
      window.open(path, "_blank");
    }
  } catch (error) {
    console.log("创建项目失败的错误 --->>>", error);
  }
};
// 删除项目API操作：
const deleteProjectItem = async (projectId) => {
  const res = await $Api.deleteProjectApi({
    ids: projectId,
  });
  if (res) {
    window["$message"].success("删除项目成功！");
    getProjectList();
  }
};
const handleDelete = (projectId) => {
  ElMessageBox.confirm("你确定删除此项目吗？")
    .then(() => {
      deleteProjectItem(projectId);
    })
    .catch((error) => {
      // catch error
      if (error === "cancel") return;
      console.log("删除项目的错误 --->>> ", error);
      window["$message"].error("删除失败！请稍后重试！");
    });
};
const handleView = (projectId) => {
  console.log("放大操作");
};
const handlePreview = (projectId) => {
  router.push(`/chart/preview/${projectId}`);
  window["$message"].success("预览操作");
};
const handleClone = (projectId) => {
  window["$message"].success("克隆操作");
};
const handleRename = (projectId) => {
  window["$message"].success("重命名操作");
};
const handleCancel = (projectId) => {
  window["$message"].success("取消发布操作");
};
const handleDownload = (projectId) => {
  window["$message"].success("下载操作");
};
const handOperate = (directive, projectId) => {
  switch (directive) {
    case "delete":
      handleDelete(projectId);
      break;
    case "view":
      handleView(projectId);
      break;
    case "edit":
      handleEdit(projectId);
    case "create":
      handleCreate();
      break;
  }
};
const handleSelect = (directive, projectId) => {
  console.log(directive, projectId);

  switch (directive) {
    case "preview":
      handlePreview(projectId);
      break;
    case "clone":
      handleClone(projectId);
      break;
    case "rename":
      handleRename(projectId);
      break;
    case "cancel":
      handleCancel(projectId);
      break;
    case "download":
      handleDownload(projectId);
      break;
    case "delete":
      handleDelete(projectId);
      break;
  }
};

// 初始化获取项目列表
const getProjectList = async () => {
  try {
    const data = await $Api.getProjectListApi({
      page: 1,
      limit: 10,
      createUserId: systemStore.userInfo.userId,
    });
    if (data) {
      projectList.value = data;
    }
  } catch (error) {
    console.log("获取项目列表出错：", error);
  }
};

onMounted(() => {
  getProjectList();
});
</script>

<style lang="scss">
.main {
  display: flex;
  flex-wrap: wrap; /* 设置自动换行 */
  width: 100%;
  height: 100%;
  background-color: #fff;
  .item {
    width: 23%;
    height: 270px;
    // background-color: #e1e1e1;
    margin: 1%;
    padding: 10px 16px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #f1f1f1;
    transition: all 0.3s ease-in-out;
    .operate {
      margin-left: 20px;
      display: flex;
      .publish {
        flex: 1;
      }
      .icon {
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .img {
      margin-top: 10px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .option {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      &-text {
        flex: 3;
        :deep(.el-text) {
          line-height: 32px !important;
          height: 32px !important;
        }
        font-size: 14px;
        color: #999;
      }
      &-edit {
        flex: 1;
      }
      &-more {
        flex: 1;
      }
    }
  }
  .item:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .create {
    position: relative;
    cursor: pointer;
    &-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
:deep(.el-text) {
  line-height: 32px !important;
  height: 32px !important;
}
</style>
