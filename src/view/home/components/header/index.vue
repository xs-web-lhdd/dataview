<template>
  <!-- 导航栏 -->
  <div class="header">
    <div class="left">
      <div class="left-img" @click="router.push('/')">
        <img :src="LogoImg" alt="" />
      </div>
      <div
        class="left-logo"
        style="margin-top: 5px; cursor: pointer"
        @click="router.push('/')"
      >
        <div
          style="
            width: 140px;
            text-align: center;
            font-size: 28px;
            color: #fff;
            line-height: 28px;
          "
        >
          Data View
        </div>
        <div
          style="width: 140px; text-align: center; font-size: 12px; color: #fff"
        >
          —— 让数据看得见 ——
        </div>
      </div>
      <div class="left-list">
        <div
          v-for="item in list"
          :class="
            activePath === item.path
              ? 'left-list-item active'
              : 'left-list-item'
          "
          @click="handleRouter(item.path)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="items" v-if="!userInfo">
        <div class="item" @click="router.push('/login')">登 陆</div>
        <div class="item" @click="router.push('/register')">注 册</div>
      </div>
      <div class="items" v-else>
        <div class="item" @click="router.push('/project/welcome')">
          进入 DataView 个人中心
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import LogoImg from "@/assets/images/logo.png";

import router from "@/router/index.js";
import { getLocalStorage } from "@/utils";

const list = [
  {
    title: "首页",
    path: "/",
  },
  {
    title: "教学视频",
    path: "/teach",
  },
];
// 获取用户信息：
const userInfo = getLocalStorage("GO_SYSTEM");
const activePath = computed(() => {
  return router.currentRoute.value.path;
});

const handleRouter = (path) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 1;
  height: 50px;
  display: flex;
  width: 100%;
  .left {
    margin-left: 50px;
    justify-content: flex-start;
    flex: 1;
    display: flex;
    &-img {
      cursor: pointer;
      img {
        height: 50px;
        width: auto;
      }
    }
    &-list {
      display: flex;
      color: #fff;
      padding: 8px 0;
      margin-left: 20px;
      &-item {
        position: relative;
        cursor: pointer;
        height: 32px;
        width: auto;
        line-height: 32px;
        margin: 0 15px;
        transition: all 0.15s linear;
      }
      &-item:hover {
        font-weight: bold;
      }
      &-item:hover::before {
        transform: scaleX(1);
      }
      &-item::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: #fff;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out;
      }
      .active::before {
        transform: scaleX(1);
      }
    }
  }
  .right {
    .items {
      display: flex;
      .item {
        cursor: pointer;
        // border-radius: 20px;
        text-align: center;
        min-width: 70px;
        width: auto;
        padding: 0 10px;
        box-sizing: border-box;
        height: 30px;
        margin: 7px 10px 7px 0;
        background-color: transparent;
        color: #fff;
        line-height: 30px;
        border: 1px solid #fff;
        font-weight: bolder;
      }
    }
  }
}
</style>
