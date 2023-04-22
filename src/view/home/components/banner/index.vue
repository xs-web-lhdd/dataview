<script setup>
import BannerImg from "@/assets/images/home/banner.png";
import LogoImg from "@/assets/images/home/logo.png";
</script>

<template>
  <div class="banner">
    <img class="img" :src="BannerImg" alt="" />
    <div class="header">
      <div class="left">
        <img :src="LogoImg" alt="" />
      </div>
      <div class="right">
        <div class="items" v-if="true">
          <div class="item">登 陆</div>
          <div class="item">注 册</div>
        </div>
        <div v-else>
          <div>创建设计</div>
          <div>我的作品</div>
          <div>刘豪</div>
        </div>
      </div>
    </div>
    <div class="content">
      <h2 class="text">海量精彩设计 一键生成</h2>
      <div class="search">
        <input class="input" type="text" />
        <el-icon
          class="icon"
          style="vertical-align: middle; color: #fff"
          size="30"
        >
          <Search />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  position: relative;
  .img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .header {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    display: flex;
    background-color: rgba($color: #000000, $alpha: 0.3);
    width: 100%;
    .left {
      margin-left: 50px;
      justify-content: flex-start;
      flex: 1;
    }
    .right {
      .items {
        display: flex;
        .item {
          border-radius: 20px;
          text-align: center;
          width: 70px;
          height: 36px;
          margin: 7px 20px 7px 0;
          background-color: #3e7fff;
          color: #fff;
          line-height: 36px;
        }
      }
    }
  }
  .content {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 200px;
    // background-color: red;
    .text {
      text-shadow: 0 0 1px rgba(68, 92, 116, 0.02),
        0 2px 8px rgba(57, 76, 96, 0.15);
      color: #fff;
      font-size: 28px;
      text-align: center;
      margin-bottom: 20px;
    }
    .search {
      width: 80%;
      height: 40px;
      box-shadow: 0 12px 24px 0 rgba(30, 29, 32, 0.8);
      box-sizing: border-box;
      margin: 0 auto;
      border: 2px solid #3e7fff;
      background-color: #3e7fff;
      border-radius: 20px;
      display: flex;
      .input {
        height: 33px;
        width: 85%;
        margin-top: 1px;
        margin-left: 1px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border: none;
        outline: none;
        text-indent: 10px;
        font-size: 20px;
      }
      .icon {
        display: block;
        margin: 2px 0 0 15px;
        width: 30px;
      }
    }
  }
}
</style>
