<!-- 宣传页 -->

<script setup></script>

<template>
  <div class="propaganda">
    <div class="container">
      <div class="propaganda-img"></div>
      <div class="propaganda-content">
        <div class="info-title">让数据真正服务于工作</div>
        <ul class="info-list">
          <li class="info-list-item">
            工作中遇到的各种数据分析问题，BDP总能给你提供不同的帮助，助你提升工作效率比，让BDP真正服务于工作。
          </li>
        </ul>
        <div class="info-btn">开始使用</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.propaganda {
  height: 560px;
  padding-top: 155px;
  background: url(../../../../assets/images/home/bg.png) top center no-repeat,
    linear-gradient(65deg, #974ff4 0, #6788ff 100%);
  box-sizing: border-box;
  .container {
    position: relative;
    margin: 0 auto;
    width: 1080px;
    height: 405px;
    box-sizing: border-box;
  }
  &-img {
    position: absolute;
    right: 50%;
    top: -155px;
    width: 50%;
    height: 560px;
    background: url(../../../../assets/images/home/computer.png) right 20px
      no-repeat;
    background-size: 520px;
    z-index: 100;
  }
  &-content {
    box-sizing: border-box;
    position: absolute;
    right: 0;
    width: 530px;
    max-width: 50%;
    padding-right: 80px;
    color: #fff;
    .info-title {
      position: relative;
      margin-bottom: 36px;
      line-height: 33px;
      font-size: 33px;
      font-weight: 300;
      text-align: left;
    }
    .info-list {
      margin-bottom: 24px;
      &-item {
        position: relative;
        line-height: 28px;
        font-size: 14px;
        text-align: justify;
        color: rgba($color: #fff, $alpha: 0.7);
      }
    }
    .info-btn {
      width: 60px;
      cursor: pointer;
      padding: 0 40px;
      line-height: 48px;
      border-radius: 40px;
      font-size: 15px;
      background: #fff;
      color: rgba(10, 18, 32, 0.64);
      box-shadow: 0 4px 8px 0 rgba(30, 62, 124, 0.15);
      color: #3748a5;
      font-weight: 700;
    }
  }
}
</style>
