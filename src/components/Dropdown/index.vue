<!-- 封装的全局下拉框 -->

<template>
  <Teleport to="body">
    <div>
      <el-dropdown trigger="contextmenu" class="dropdown">
        <span class="el-dropdown-link">
          Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item> Action 2 </el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item>Action 4</el-dropdown-item>
            <el-dropdown-item>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  x: {
    // type: Object,
    required: true,
  },
  y: {
    // type: Boolean,
    default: true,
  },
});

const x = computed(() => {
  return props.x;
});
const y = computed(() => {
  return props.y;
});
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  top: v-bind(x);
  left: v-bind(y);
}
</style>
