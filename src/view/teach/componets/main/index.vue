<script setup>
import { ref } from "vue";
const activeName = ref("first");
</script>

<template>
  <div class="main">
    <div class="main-wrap">
      <div class="content">
        <el-tabs v-model="activeName" class="demo-tabs" tab-position="top">
          <el-tab-pane label="热门视频" name="first">
            <ul class="video-list">
              <li v-for="item in 10">
                <div class="video-mask">
                  <p class="video-title">制作双轴图</p>
                  <p class="video-desc">如何制作双轴图（折线图+柱状图）</p>
                  <div class="video-duration">1:18</div>
                </div>
                <div class="video-mask-hover">
                  <el-icon class="icon"><VideoPlay /></el-icon>
                </div>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="数据接入" name="second">数据接入</el-tab-pane>
          <el-tab-pane label="数据处理" name="third">数据处理</el-tab-pane>
          <el-tab-pane label="可视化展示" name="fourth">可视化展示</el-tab-pane>
          <el-tab-pane label="图表类型" name="fiveth">工作场景</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <section class="contact">
      <p>
        若上述视频还没解决你的问题，快来告诉我们！
        <a href="">联系我们</a>
      </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  &-wrap {
    width: 1080px;
    margin: 0 auto;
    box-shadow: 0 8px 24px 0 rgba(63, 74, 105, 0.16);
    .content {
      width: 100%;
      background-color: #7edfdd;
      transform: translateY(-80px);
      padding: 40px 60px 0px;
      background: #fff;
      box-sizing: border-box;
      .video-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 30%;
          height: 200px;
          margin: 1%;
          background-color: #7edfdd;
          position: relative;
        }
      }
      .video {
        &-mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(#9ac4fb 0, #5c91ed 100%);
          width: 100%;
          height: 100%;
          z-index: 10;
          text-align: center;
          color: #fff;
          &-hover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 20;
            background: rgba(0, 0, 0, 0.696);
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            .icon {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 40px;
              height: 40px;
              margin: -20px 0 0 -20px;
              border-radius: 100%;
              box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12),
                0 8px 16px 0 rgba(0, 0, 0, 0.1);
              color: #fff;
              background: #5182e4;
              font-size: 28px;
            }
          }
          &-hover:hover {
            opacity: 1;
          }
        }
        &-title {
          margin-top: 60px;
          font-size: 18px;
          line-height: 25px;
          font-weight: 700;
        }
        &-desc {
          margin-top: 16px;
          padding: 0 20px;
          font-size: 13px;
          line-height: 18px;
          color: rgba(255, 255, 255, 0.7);
        }
        &-duration {
          position: absolute;
          bottom: 8px;
          right: 8px;
          padding: 0 8px;
          line-height: 20px;
          font-size: 12px;
          font-weight: 700;
          background: #170b37;
          border-radius: 2px;
        }
      }
      // .video:hover {
      //   .video-mask-hover {
      //     z-index: 20;
      //     background: rgba(0, 0, 0, 0.696);
      //   }
      // }
    }
  }
  .contact {
    margin: 45px auto 40px;
    text-align: center;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, STHeitiSC-Light,
      WOL_SB, "Segoe UI Semibold", "Segoe UI", Tahoma, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: #666;
    p {
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
    a {
      margin-left: 4px;
      color: #5182e4;
      cursor: pointer;
      text-decoration: none;
    }
  }
}
:deep(.el-tabs__nav) {
  float: none !important;
  justify-content: center;
}
</style>
