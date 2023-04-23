<template>
  <preview :key="key"></preview>
</template>

<script setup>
import { getSessionStorageInfo } from "./utils";
import { SavePageEnum } from "@/enums/editPageEnum.js";
import { setSessionStorage } from "@/utils";
import { StorageEnum } from "@/enums/storageEnum";
import { ref } from "vue";
import Preview from "./index.vue";

let key = ref(Date.now());

// 数据变更 -> 组件销毁重建
![SavePageEnum.JSON, SavePageEnum.CHART].forEach((saveEvent) => {
  if (!window.opener) return;
  window.opener.addEventListener(saveEvent, async (e) => {
    const localStorageInfo = await getSessionStorageInfo();
    setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [
      { ...e.detail, id: localStorageInfo.id },
    ]);
    key.value = Date.now();
  });
});
</script>
