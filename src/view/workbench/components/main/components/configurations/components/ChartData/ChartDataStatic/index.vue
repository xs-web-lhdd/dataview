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
        <div>
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          >
            <el-button type="primary" plain>导入 JSON / Txt</el-button>
          </el-upload>
        </div>
        <div>
          <el-button type="primary" plain>下载</el-button>
          <el-tooltip
            effect="dark"
            content="点击 【下载】查看完整数据"
            placement="bottom"
          >
            <el-button :icon="InfoFilled" plain circle />
          </el-tooltip>
        </div>
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
/**
 * * 数据映射 数据内容
 */
import { ref, computed, watch } from "vue";
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
  // ajax: {
  //   type: Boolean,
  //   required: true,
  // },
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

// 表格标题
const tableTitle = ["字段", "映射", "状态"];

const source = ref();
const dimensions = ref([]);
const dimensionsAndSource = ref();
const noData = ref(false);

// const { uploadFileListRef, customRequest, beforeUpload, download } =
//   useFile(targetData);

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
  console.log(dimensions);
  try {
    // 去除首项数据轴标识
    return dimensions.map((item, index) => {
      console.log(index, item);
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
  :deep() {
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
  .source-btn-box {
    margin-top: 10px !important;
  }
}
.btn {
  display: flex;
  // justify-content: space-between;
}
</style>
