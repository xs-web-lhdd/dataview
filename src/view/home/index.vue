<script setup>
import Banner from "./components/banner/index.vue";
import Header from "./components/header/index.vue";
import BannerOne from "./components/bannerOne/index.vue";
import Propaganda from "./components/propaganda/index.vue";
import Footer from "./components/footer/index.vue";

import cardImg1 from "@/assets/images/home/card1.png";
import cardImg2 from "@/assets/images/home/card2.png";
import cardImg3 from "@/assets/images/home/card3.png";

const cardList = [
  {
    img: cardImg1,
    title: "专注H5始终如一",
    desc: "三年保持行业领先",
  },
  {
    img: cardImg2,
    title: "海量 H5 模版",
    desc: "一键生成，一分钟轻松制作",
  },
  {
    img: cardImg3,
    title: "极致体验",
    desc: "用户的一致选择",
  },
];
</script>

<template>
  <div class="home">
    <Header />
    <!-- <Banner></Banner> -->
    <BannerOne />
    <!-- 宣传页 -->
    <Propaganda />
    <!-- 卡片页 -->
    <div class="card">
      <div class="card-item" v-for="item in cardList" :key="item.img">
        <img class="img" :src="item.img" alt="" />
        <h3 class="title">{{ item.title }}</h3>
        <p class="des">{{ item.desc }}</p>
      </div>
    </div>
    <!-- 底部 -->
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.home {
  .card {
    display: flex;
    width: 100%;
    background-color: #f1f1f1;
    &-item {
      flex-basis: 0;
      flex-grow: 1;
      text-align: center;
      padding: 20px 0;
      .title {
        margin: 5px 0;
        font-size: 19px;
        color: #333;
      }
      .des {
        color: #666;
      }
    }
  }
}
</style>
