<template>
  <div class="main">
    <div class="introduce-wrap">
      <div class="introduce" v-for="(item, index) in listData" :key="item.img">
        <template v-if="index % 2 == 0" class="introduce-left">
          <div class="introduce-left-content">
            <div class="info-title">{{ item.title }}</div>
            <ul class="info-list">
              <li class="info-list-item" v-for="info in item.infoList">
                {{ info }}
              </li>
            </ul>
            <div class="info-btn">{{ item.btn }}</div>
          </div>
          <div class="introduce-left-img" v-for="img in item.imgList">
            <img :src="img" alt="" />
          </div>
        </template>
        <template v-else class="introduce-right">
          <div class="introduce-right-img" v-for="img in item.imgList">
            <img :src="img" alt="" />
          </div>
          <div class="introduce-right-content">
            <div class="info-title">{{ item.title }}</div>
            <ul class="info-list">
              <li class="info-list-item" v-for="info in item.infoList">
                {{ info }}
              </li>
            </ul>
            <div class="info-btn">{{ item.btn }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import IntroduceOneOne from "../../../../assets/images/home/introduce1-1.png";
import IntroduceOneTwo from "../../../../assets/images/home/introduce1-2.png";
import IntroduceOneThree from "../../../../assets/images/home/introduce1-3.png";
import IntroduceTwoOne from "../../../../assets/images/home/introduce2-1.png";
import IntroduceTwoTwo from "../../../../assets/images/home/introduce2-2.png";
import IntroduceTwoThree from "../../../../assets/images/home/introduce2-3.png";
import IntroduceThreeOne from "../../../../assets/images/home/introduce3-1.png";
import IntroduceThreeTwo from "../../../../assets/images/home/introduce3-2.png";
import IntroduceThreeThree from "../../../../assets/images/home/introduce3-3.png";
import IntroduceFoueOne from "../../../../assets/images/home/introduce4-1.png";
import IntroduceFourTwo from "../../../../assets/images/home/introduce4-2.png";
import IntroduceFourThree from "../../../../assets/images/home/introduce4-3.png";
import IntroduceFourFour from "../../../../assets/images/home/introduce4-4.png";
import IntroduceFourFive from "../../../../assets/images/home/introduce4-5.png";
import IntroduceFiveOne from "../../../../assets/images/home/introduce5-1.png";
import IntroduceFiveTwo from "../../../../assets/images/home/introduce5-2.png";
import IntroduceFiveThree from "../../../../assets/images/home/introduce5-3.png";
const listData = [
  {
    title: "整合各类数据，全面分析业务",
    infoList: [
      "支持接入多种数据源，包括本地数据，网站统计、广告推广等各种第三方平台数据，同时还能连接各类数据库和同步工具",
      "在BDP完美整合所有业务数据，展开全面分析，数据同步更新，及时掌握最新数据动态",
    ],
    imgList: [IntroduceOneOne, IntroduceOneTwo, IntroduceOneThree],
    btn: "开始使用",
  },
  {
    title: "不懂技术，也可轻松搞定数据展示",
    infoList: [
      "在BOP，不用写函数，也不用写SQL，拖拽即可完成多表展示、追加合并等操作，很轻松实现数据清洗、处理，你也可以是数据专家",
      "多表展示：将多张数据报表实时展示。",
      "追加合并：多个相同的图，快速整合成一张新图，免去Ctrl+C/Ctrl+V之苦。",
    ],
    imgList: [IntroduceTwoOne, IntroduceTwoTwo, IntroduceTwoThree],
    btn: "开始使用",
  },
  {
    title: "无需编程，拖拽即可生成数据报表，1分钟搞定可视化分析",
    infoList: [
      "拖拽瞬间生成数据图表，几十种炫酷的可视化图表任你选",
      "图文混排，让你的数据报表图文并茂，让老板一眼了解业务变动",
    ],
    imgList: [IntroduceThreeOne, IntroduceThreeTwo, IntroduceThreeThree],
    btn: "开始使用",
  },
  {
    title: "替换原始数据，图表实时更新，轻松搞定周报月报",
    infoList: [
      "只需替换/追加用于作图的数据，图表也会同步更新",
      "例行的周报月报，可以定期更新数据（替换/追加），数据报表即可更新，无需每周每月重复做报表",
    ],
    imgList: [
      IntroduceFoueOne,
      IntroduceFourTwo,
      IntroduceFourThree,
      IntroduceFourFour,
      IntroduceFourFive,
    ],
    btn: "开始使用",
  },
  {
    title: "一键导出、分享报表，数据汇报就是这么高效",
    infoList: [
      "实时分享：业务报表通过链接直接分享给上级，分享结果实时更新",
      "大屏展示：可视化大屏展示，方便每周会议的数据分享和业务讨论",
      "一键导出：支持一键导出数据报表，PNG、PDF任你挑",
    ],
    imgList: [IntroduceFiveOne, IntroduceFiveTwo, IntroduceFiveThree],
    btn: "开始使用",
  },
];
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-color: transparent;
}
.introduce-wrap {
  width: 1240px;
  margin: 0 auto;
}
.introduce {
  width: 100%;
  height: 560px;
  display: flex;
  margin: 0 auto;
  position: relative;
  // 偶数样式：
  &-left {
    &-content {
      max-width: 560px;
      margin-left: 46px;
      padding-top: 150px;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      .info-title {
        position: relative;
        margin-bottom: 16px;
        line-height: 33px;
        font-size: 33px;
        font-weight: 300;
        text-align: left;
        margin-left: 20px;
        color: rgba(10, 18, 32, 0.87);
      }
      .info-title::before {
        position: absolute;
        top: -40px;
        right: 0;
        left: 0px;
        content: "";
        display: block;
        width: 50px;
        height: 8px;
        background: #7edfdd;
      }
      .info-list {
        margin-bottom: 24px;
        margin-left: 20px;
        &-item {
          position: relative;
          padding-left: 18px;
          line-height: 28px;
          font-size: 14px;
          text-align: justify;
          color: rgba(10, 18, 32, 0.64);
        }
        &-item::before {
          content: "";
          position: absolute;
          top: 9px;
          left: 0;
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 100%;
          border: 2px solid #7edfdd;
        }
      }
      .info-btn {
        margin-left: 20px;
        width: 60px;
        padding: 0 32px;
        line-height: 40px;
        border-radius: 40px;
        font-size: 14px;
        background: #2e68dc;
        box-shadow: 0 4px 8px 0 rgba(30, 62, 124, 0.15);
        color: #fff;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
      }
    }
    &-img {
      align-self: flex-end;
      width: 604px;
      height: 560px;
      position: absolute;
      right: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  // 奇数样式：
  &-right {
    &-content {
      max-width: 560px;
      margin-left: 46px;
      padding-top: 150px;
      box-sizing: border-box;
      position: absolute;
      right: 0;
      .info-title {
        position: relative;
        margin-bottom: 16px;
        line-height: 33px;
        font-size: 33px;
        font-weight: 300;
        text-align: left;
        margin-left: 20px;
        color: rgba(10, 18, 32, 0.87);
      }
      .info-title::before {
        position: absolute;
        top: -40px;
        right: 0;
        left: 0px;
        content: "";
        display: block;
        width: 50px;
        height: 8px;
        background: #7edfdd;
      }
      .info-list {
        margin-bottom: 24px;
        margin-left: 20px;
        &-item {
          position: relative;
          padding-left: 18px;
          line-height: 28px;
          font-size: 14px;
          text-align: justify;
          color: rgba(10, 18, 32, 0.64);
        }
        &-item::before {
          content: "";
          position: absolute;
          top: 9px;
          left: 0;
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 100%;
          border: 2px solid #7edfdd;
        }
      }
      .info-btn {
        margin-left: 20px;
        width: 60px;
        padding: 0 32px;
        line-height: 40px;
        border-radius: 40px;
        font-size: 14px;
        background: #2e68dc;
        box-shadow: 0 4px 8px 0 rgba(30, 62, 124, 0.15);
        color: #fff;
        font-weight: 700;
        text-align: center;
        cursor: pointer;
      }
    }
    &-img {
      align-self: flex-end;
      width: 604px;
      height: 560px;
      position: absolute;
      left: 46px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
