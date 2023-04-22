<!-- 项目列表页 -->

<template>
  <div class="main">
    <div class="item" v-for="item in 10">
      <div class="operate">
        <div class="publish">
          <div v-if="true" style="position: relative">
            <el-icon style="color: #67c23a; position: absolute; top: 1px"
              ><SuccessFilled
            /></el-icon>
            <span style="font-size: 16px; margin-left: 18px">已发布</span>
          </div>
          <div v-else style="position: relative">
            <el-icon style="color: #f56c6c; position: absolute; top: 1px"
              ><CircleCloseFilled
            /></el-icon>
            <span style="font-size: 16px; margin-left: 18px">未发布</span>
          </div>
        </div>
        <div class="icon" @click="handOperate('delete')">
          <el-icon style="color: #f56c6c"><Delete /></el-icon>
        </div>
        <div class="icon" @click="handOperate('view')">
          <el-icon style="color: #67c23a"><View /></el-icon>
        </div>
      </div>
      <div class="img">
        <img src="../../../../assets/images/home/icon1.png" alt="" />
      </div>
      <div class="option">
        <el-text type="primary" class="option-text mx-1" size="large"
          >Success</el-text
        >
        <div class="option-edit">
          <el-tooltip
            class="box-item"
            effect="light"
            content="编辑"
            placement="top-start"
          >
            <el-button type="primary" plain @click="handleEdit">
              <el-icon><Edit /></el-icon>
            </el-button>
          </el-tooltip>
        </div>

        <el-dropdown>
          <!-- <el-button type="primary">
            Dropdown List<el-icon class="el-icon--right"
              ><arrow-down
            /></el-icon>
          </el-button> -->
          <el-button type="primary" plain>
            <el-icon><More /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in selectList"
                :key="item.label"
                :icon="item.icon"
                >{{ item.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

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
import { useRouter } from "vue-router";
import {
  ArrowDown,
  Check,
  DocumentCopy,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from "@element-plus/icons-vue";

const router = useRouter();
const handleEdit = () => {
  router.push("/");
};
const handleCreate = () => {
  router.push("/workbench");
};
const handleDelete = () => {
  console.log("删除操作");
};
const handleView = () => {
  console.log("放大操作");
};
const handOperate = (directive) => {
  switch (directive) {
    case "delete":
      handleDelete();
      break;
    case "view":
      handleView();
      break;
    case "edit":
      handleEdit();
    case "create":
      handleCreate();
      break;
  }
};
const selectList = [
  {
    icon: ArrowDown,
    label: "预览",
  },
  {
    icon: DocumentCopy,
    label: "克隆",
  },
  {
    icon: CircleCheck,
    label: "重命名",
  },
  {
    icon: CirclePlusFilled,
    label: "取消发布",
  },
  {
    icon: CirclePlus,
    label: "下载",
  },
  {
    icon: Plus,
    label: "删除",
  },
];
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
    background-color: #e1e1e1;
    margin: 1%;
    padding: 10px 16px;
    box-sizing: border-box;
    border-radius: 10px;
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
      height: 180px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .option {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      &-text {
        flex: 3;
        :deep(.el-text) {
          line-height: 32px !important;
          height: 32px !important;
        }
      }
      &-edit {
        flex: 1;
      }
      &-more {
        flex: 1;
      }
    }
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
