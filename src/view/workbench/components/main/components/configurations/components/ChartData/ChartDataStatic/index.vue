<!-- 静态数据选项卡 -->

<template>
  <!-- <n-timeline-item type="success" :title="TimelineTitleEnum.CONTENT">
      <n-space vertical>
        <n-space class="source-btn-box"> -->
  <!-- 导入(json/text) -->
  <!-- <n-upload
            v-model:file-list="uploadFileListRef"
            :show-file-list="false"
            :customRequest="customRequest"
            @before-upload="beforeUpload"
          >
            <n-space>
              <n-button v-if="!ajax" class="sourceBtn-item" :disabled="noData">
                <template #icon>
                  <n-icon>
                    <document-add-icon />
                  </n-icon>
                </template>
                导入（json / txt）
              </n-button>
            </n-space>
          </n-upload> -->
  <!-- 下载和右侧的问号提示符号 -->
  <!-- <div>
            <n-button class="sourceBtn-item" :disabled="noData" @click="download">
              <template #icon>
                <n-icon>
                  <document-download-icon />
                </n-icon>
              </template>
              下载
            </n-button>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon class="go-ml-1" size="21" :depth="3">
                  <help-outline-icon></help-outline-icon>
                </n-icon>
              </template>
              <n-text depth="3">点击【下载】查看完整数据</n-text>
            </n-tooltip>
          </div>
        </n-space> -->
  <!-- json 代码块 -->
  <!-- <n-card size="small">
          <n-code :code="toString(source)" language="json"></n-code>
        </n-card>
      </n-space> -->
  <!-- </n-timeline-item> -->

  <el-timeline>
    <el-timeline-item
      timestamp="数据映射"
      placement="top"
      v-show="isCharts && dimensionsAndSource"
    >
      <el-table :data="dimensionsAndSource" border style="width: 100%">
        <el-table-column prop="field" label="字段" width="100" />
        <el-table-column prop="mapping" label="映射" width="100" />
        <el-table-column prop="result" label="状态" />
      </el-table>
    </el-timeline-item>
    <el-timeline-item timestamp="数据内容" placement="top">
      <div class="btn">
        <div style="margin-right: 10px" v-if="!ajax">
          <el-upload
            v-model:file-list="uploadFileListRef"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :http-request="customRequest"
          >
            <el-button type="primary" plain>导入 JSON / Txt</el-button>
          </el-upload>
        </div>
        <div>
          <el-button type="primary" plain @click="download">下载</el-button>
          <el-tooltip
            effect="dark"
            content="点击 【下载】查看完整数据"
            placement="bottom"
          >
            <el-button :icon="InfoFilled" plain circle />
          </el-tooltip>
        </div>
      </div>
      <el-card>
        <prism-editor
          class="my-editor"
          v-model="code"
          :highlight="highlighter"
          :readonly="true"
        ></prism-editor>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
/**
 * * 数据映射 数据内容
 */
import { ref, computed, watch } from "vue";
// 引入 code 高亮组件
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

import { RequestDataTypeEnum } from "@/enums/httpEnum.js";
import { useFile } from "../hooks/useFile.js";
import { useTargetData } from "../../../hooks/useTargetData.js";
import { toString, isArray } from "@/utils";
import { InfoFilled } from "@element-plus/icons-vue";

const { targetData } = useTargetData();

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
  },
  ajax: {
    type: Boolean,
    required: true,
  },
});

const ChartFrameEnum = {
  // 支持 dataset 的 echarts 框架
  ECHARTS: "echarts",
  // UI 组件框架
  NAIVE_UI: "naiveUI",
  // 自定义带数据组件
  COMMON: "common",
  // 无数据变更
  STATIC: "static",
};

const code = ref("");
const source = ref();
const dimensions = ref([]);
const dimensionsAndSource = ref();
const noData = ref(false);

const { uploadFileListRef, customRequest, beforeUpload, download } =
  useFile(targetData);

// 是否展示过滤器
// const filterShow = computed(() => {
//   return (
//     targetData.value.request.requestDataType !== RequestDataTypeEnum.STATIC
//   );
// });

// 是支持 dataset 的图表类型
const isCharts = computed(() => {
  return targetData.value.chartConfig.chartFrame === ChartFrameEnum.ECHARTS;
});

// 匹配结果
const DataResultEnum = {
  NULL: "无",
  SUCCESS: "匹配成功",
  FAILURE: "匹配失败",
};

// 处理映射列表状态结果
const matchingHandle = (mapping) => {
  let res = DataResultEnum.SUCCESS;
  for (let i = 0; i < source.value.length; i++) {
    if (source.value[i][mapping] === undefined) {
      res = DataResultEnum.FAILURE;
      return res;
    }
  }
  return DataResultEnum.SUCCESS;
};

// 处理映射列表
const dimensionsAndSourceHandle = (dimensions) => {
  try {
    // 去除首项数据轴标识
    return dimensions.map((item, index) => {
      return index === 0
        ? {
            field: "通用标识",
            mapping: item,
            result: DataResultEnum.NULL,
          }
        : {
            field: `数据项-${index}`,
            mapping: item,
            result: matchingHandle(item),
          };
    });
  } catch (error) {
    console.log("error --->>> ", error);
    return [];
  }
};

const highlighter = (code) => {
  return highlight(code, languages.js); // languages.<insert language> to return html with markup
};

watch(
  () => targetData.value?.option?.dataset,
  (newData) => {
    if (
      newData &&
      targetData?.value?.chartConfig?.chartFrame === ChartFrameEnum.ECHARTS
    ) {
      // 有新数据并且是 echarts 类型的数据
      // 只有 DataSet 数据才有对应的格式
      source.value = newData;

      code.value = toString(source.value);

      if (isCharts.value) {
        dimensions.value = newData.dimensions;
        dimensionsAndSource.value = dimensionsAndSourceHandle(dimensions.value);
      }
    } else if (newData !== undefined && newData !== null) {
      dimensionsAndSource.value = null;
      source.value = newData;
    } else {
      noData.value = true;
      source.value = "此组件无数据源";
    }
    if (isArray(newData)) {
      dimensionsAndSource.value = null;
      console.log("是数组的逻辑");
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.go-chart-configurations-timeline {
  .source-btn-box {
    margin-top: 10px !important;
  }
}
.btn {
  display: flex;
}
:deep(.el-card) {
  margin-top: 10px;
}

/* vue-prism-editor 设置的 CSS */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  // background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;

  /* optional class for removing the outline */
  :deep(.prism-editor__textarea) {
    // -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* 选中态 */
    // -webkit-focus-ring-color: rgba(255, 255, 255, 0); /* 聚焦态 */
    // background-color: #fff; /* 设置背景色 */
    border: none; /* 去除边框 */
    outline: none; /* 去除外边框 */
  }
}
</style>
