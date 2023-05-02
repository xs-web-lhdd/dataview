<script setup>
import router from "@/router/index.js";
// 图片
import bannerOne from "@/assets/images/home/banner1.png";
import bannerTwo from "@/assets/images/home/banner2.png";
import bannerThree from "@/assets/images/home/banner3.png";
import bannerFour from "@/assets/images/home/banner4.png";
import bannerFive from "@/assets/images/home/banner5.png";
import IconOne from "@/assets/images/home/icon-1.png";
import IconTwo from "@/assets/images/home/icon-2.png";
import IconThree from "@/assets/images/home/icon-3.png";
import IconFour from "@/assets/images/home/icon-4.png";
import IconFive from "@/assets/images/home/icon-5.png";
import IconSix from "@/assets/images/home/icon-6.png";
// 介绍列表：
import Introduce from "../introduce/index.vue";
import { getLocalStorage } from "@/utils";

const banners = [
  {
    class: "item1",
    desc: "xxxxx",
    img: bannerOne,
  },
  {
    class: "item2",
    desc: "xxxxx",
    img: bannerTwo,
  },
  {
    class: "item3",
    desc: "xxxxx",
    img: bannerThree,
  },
  {
    class: "item4",
    desc: "xxxxx",
    img: bannerFour,
  },
  {
    class: "item5",
    desc: "xxxxx",
    img: bannerFive,
  },
];

const featureList = [
  {
    img: IconOne,
    summary: "永久免费 简单易用",
    detail:
      "无需下载，注册账号即可使用。简单清爽的操作流程，让业务人员也能轻松搞定数据分析。",
  },
  {
    img: IconTwo,
    summary: "一键对接业务数据",
    detail:
      "工作中需要的各种内部业务数据、外部营销数据，都能通过BDP个人版一键对接处理、整合分析。",
  },
  {
    img: IconThree,
    summary: "拖拽完成数据处理",
    detail:
      "数据处理不再需求助于程序员和数据分析师，拖拽式操作，不会SQL、Excel也能搞定数据处理。",
  },
  {
    img: IconFour,
    summary: "灵活的多维度分析",
    detail:
      "灵活实时的多维度分析，支持数据多层级下钻，让你从各切面了解业务数据，一目了然看出变化和问题。",
  },
  {
    img: IconFive,
    summary: "拖拽生成炫酷图表",
    detail:
      "几十种实用炫酷的可视化图表，只需拖拽维度（X轴）和数值（Y轴）即可实时生成。",
  },
  {
    img: IconSix,
    summary: "图表数据实时更新",
    detail:
      "原始数据更新，图表随之更新，例行的周报月报，只需更新数据，即可迅速完成报表，工作效率成倍提升。",
  },
];
// 获取用户信息：
const userInfo = getLocalStorage("GO_SYSTEM");
const handleUse = () => {
  if (userInfo) {
    window["$message"].success("欢迎使用 DataView ！");
    router.push("/project/welcome");
  } else {
    window["$message"].warning("你还没有登陆，请先去登陆！");
    router.push("/login");
  }
};
</script>

<template>
  <div class="block text-center">
    <!-- 轮播图 -->
    <el-carousel height="740px">
      <el-carousel-item v-for="item in banners" :key="item">
        <div class="items">
          <div :class="item.class" class="item">
            <div class="item-content">
              <div class="banner-content">
                <h3 class="banner-title">数据可视化展示神器</h3>
                <p class="banner-desc">人人都是数据达人</p>
                <div class="banner-btn" :class="item.class" @click="handleUse">
                  免费使用
                </div>
              </div>
              <div class="banner-img">
                <img :src="item.img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="feature-wrap">
      <div class="feature">
        <h3 class="feature-title">在 SH 个人版，你将收获极致的数据分析体验</h3>
        <div class="feature-list">
          <div class="feature-item" v-for="item in featureList">
            <div class="symbol">
              <img :src="item.img" alt="" />
            </div>
            <div class="summary">{{ item.summary }}</div>
            <p class="detail">
              {{ item.detail }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 介绍列表： -->
    <Introduce />
  </div>
</template>

<style lang="scss" scoped>
.block {
  .feature-wrap {
    width: 100%;
    height: 460px;
    position: relative;
    background-color: transparent;
    .feature {
      position: absolute;
      top: -128px;
      left: 50%;
      transform: translateX(-50%);
      width: 1048px;
      height: 460px;
      margin: 0 auto;
      background-color: #fff;
      padding: 64px;
      box-shadow: 0 8px 24px 0 rgba(63, 74, 105, 0.16);
      &-title {
        margin-bottom: 8px;
        text-align: center;
        font-weight: 300;
        color: rgba(10, 18, 32, 0.87);
        font-size: 36px;
        line-height: 50px;
      }
      &-list {
        display: flex;
        flex-wrap: wrap;
      }
      &-item {
        flex-basis: calc(33.33% - 20px);
        margin: 10px;
        .symbol {
          width: 64px;
          height: 64px;
          border-radius: 100%;
          text-align: center;
          box-shadow: 0 6px 12px 0 rgba(44, 45, 77, 0.12);
          img {
            width: 80%;
            height: 80%;
            border-radius: 100%;
            margin: 10%;
          }
        }
        .summary {
          margin-top: 24px;
          margin-bottom: 12px;
          line-height: 22px;
          font-size: 16px;
          color: rgba(10, 18, 32, 0.87);
        }
        .detail {
          height: 60px;
          line-height: 20px;
          text-align: justify;
          font-size: 12px;
          color: rgba(10, 18, 32, 0.46);
        }
      }
    }
  }
}

.items {
  width: 100%;
  height: 100% !important;
  .item {
    position: relative;
    height: 100%;
    margin: 0 auto;
    &-content {
      position: relative;
      width: 1280px;
      height: 100%;
      margin: 0 auto;
    }
    .banner-content {
      position: absolute;
      bottom: 320px;
      left: 80px;
    }
    .banner-title {
      line-height: 56px;
      font-size: 40px;
      font-weight: 200;
      color: #fff;
    }
    .banner-desc {
      margin: 20px 0 30px 0;
      font-size: 18px;
      letter-spacing: 10px;
      color: #fff;
    }
    .banner-btn {
      width: 60px;
      height: 48px;
      padding: 0 40px;
      line-height: 48px;
      border-radius: 40px;
      font-size: 15px;
      font-weight: bold;
      background: #fff;
      color: rgba(10, 18, 32, 0.64);
      box-shadow: 0 4px 8px 0 rgba(30, 62, 124, 0.15);
      cursor: pointer;
    }
    .item1 {
      color: #4f60bf;
    }
    .item2 {
      color: #226dc0;
    }
    .item3 {
      color: #d83e3b;
    }
    .item4 {
      color: #6c33d8;
    }
    .item5 {
      color: #0b9c89;
    }
    .banner-img {
      position: absolute;
      right: 0;
      bottom: 130px;
      width: 700px;
      height: 520px;
      z-index: 1;
      text-align: center;
      img {
        width: 700px;
        height: 520px;
      }
    }
  }
}
.item1 {
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #6895fa 0, #645cf3 100%);
}
.item2 {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4481eb 0, #04befe 100%);
}
.item3 {
  width: 100%;
  height: 100%;
  background: linear-gradient(314.45deg, #ff9a44 0, #fc6076 100%);
}
.item4 {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    134.33deg,
    #8460ff 0,
    #8831f6 59.49%,
    #892cf5 66.77%,
    #8927f4 73.2%,
    #8a20f3 82.45%,
    #8b12f0 100%
  );
}
.item5 {
  width: 100%;
  height: 100%;
  background: linear-gradient(
      180deg,
      rgba(0, 180, 197, 0.77) 0,
      rgba(86, 235, 182, 0.5) 100%
    ),
    linear-gradient(135deg, #00c5c8 0, #0ed1ab 76.09%, #76e0c8 100%);
}
:deep(.el-carousel__indicators) {
  bottom: 180px !important;
}
</style>
