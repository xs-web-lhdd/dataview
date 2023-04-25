<!-- 请求 model 配置 -->

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  showModel: {
    type: Boolean,
    require: true,
  },
  request: {
    type: Object,
    request: true,
  },
});
const showModel = ref(props.showModel);
const tableList = ref([
  {
    id: 1,
    key: "key",
    value: "value",
    error: false,
  },
  {
    id: 2,
    key: "k",
    value: "v",
    error: true,
  },
  {
    id: 3,
    key: "",
    value: "",
    error: false,
  },
]);
const activeHeaderName = ref("Header");
const requestModeValue = ref("0");

watch(
  () => props.showModel,
  (newData) => {
    showModel.value = newData;
  }
);

// 新增
const addColumn = (index) => {
  tableList.value.splice(index + 1, 0, {
    id: "xx",
    key: "",
    value: "",
    error: false,
  });
};
// 减少
const removeColumn = (index) => {
  if (tableList.value.length !== 1) {
    tableList.value.splice(index, 1);
  }
  blur();
};
</script>

<template>
  <el-dialog v-model="showModel" title="请求配置" width="50%">
    <div>
      <el-form>
        <el-form-item label="请求根地址">
          <el-input
            placeholder="例：http:127.0.0.1/"
            v-model="props.request.requestOriginUrl"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求头参数配置">
          <el-tabs v-model="activeHeaderName">
            <el-tab-pane label="Header" name="Header">
              <table class="border">
                <thead>
                  <tr class="border">
                    <th>id</th>
                    <th>Key</th>
                    <th>Value</th>
                    <th>操作</th>
                    <th>结果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableList" :key="index">
                    <td class="border">
                      <el-input v-model="item.id" disabled />
                    </td>
                    <td class="border"><el-input v-model="item.key" /></td>
                    <td class="border"><el-input v-model="item.value" /></td>
                    <td class="border">
                      <div
                        style="width: 100px; display: flex; padding: 5px 10px"
                      >
                        <el-button type="primary" @click="addColumn(index)"
                          >+</el-button
                        >
                        <el-button type="warning" @click="removeColumn(index)"
                          >-</el-button
                        >
                      </div>
                    </td>
                    <td class="border">
                      <el-button v-if="item.error" text type="warning">
                        格式错误
                      </el-button>
                      <el-button v-else text type="primary">
                        格式通过
                      </el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div>
      <el-form :inline="true">
        <el-form-item label="请求方式">
          <el-select v-model="requestModeValue">
            <el-option label="get" value="0"></el-option>
            <el-option label="post" value="1"></el-option>
            <el-option label="put" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求相对地址">
          <el-input
            placeholder="请输入地址（除去请求根地址）"
            v-model="props.request.requestApi"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求头参数配置">
          <el-tabs v-model="activeHeaderName">
            <el-tab-pane label="Header" name="Header">
              <table class="border">
                <thead>
                  <tr class="border">
                    <th>id</th>
                    <th>Key</th>
                    <th>Value</th>
                    <th>操作</th>
                    <th>结果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableList" :key="index">
                    <td class="border">
                      <el-input v-model="item.id" disabled />
                    </td>
                    <td class="border"><el-input v-model="item.key" /></td>
                    <td class="border"><el-input v-model="item.value" /></td>
                    <td class="border">
                      <div
                        style="width: 100px; display: flex; padding: 5px 10px"
                      >
                        <el-button type="primary" @click="addColumn(index)"
                          >+</el-button
                        >
                        <el-button type="warning" @click="removeColumn(index)"
                          >-</el-button
                        >
                      </div>
                    </td>
                    <td class="border">
                      <el-button v-if="item.error" text type="warning">
                        格式错误
                      </el-button>
                      <el-button v-else text type="primary">
                        格式通过
                      </el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showModel = false">取消</el-button>
        <el-button type="primary" @click="showModel = false"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.border {
  border: 1px solid #eee;
}
</style>
