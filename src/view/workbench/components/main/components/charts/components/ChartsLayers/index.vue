<!-- 图层列表页面 -->

<script setup></script>

<template>
  <div class="layer">
    <div class="layer-header">
      <div>
        <span style="vertical-align: middle; margin-right: 5px">图层</span>
        <el-icon style="vertical-align: middle"><Coin /></el-icon>
      </div>
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="layer-content">
      <el-scrollbar class="scrollbar">
        <!-- <span>暂无图层！</span> -->
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layer {
  width: 100%;
  height: 100%;
  &-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #e5e6eb;
    border-bottom: 2px solid #fff;
    color: #333;
  }
  &-content {
    height: calc(100% - 42px);
    background-color: #f2f3f5;
    span {
      text-align: center;
    }
  }
}
</style>
