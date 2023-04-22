<!-- 页面底部 -->

<script setup></script>

<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col">
          <ul>
            <li>河南理工大学计算机科学与技术学院</li>
            <li>400-786-2920</li>
            <li>awaitMatter@163.com</li>
          </ul>
        </div>
        <div class="code"></div>
      </div>
      <!-- <div class="footer-links"></div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  height: 320px;
  background-color: #fff;
  width: 100%;
  background: #1c1f37;
  color: rgba(255, 255, 255, 0.7);
  .container {
    max-width: 1280px;
    width: 1080px;
    height: 320px;
    margin: 0 auto;
    padding: 56px 0 24px 0;
    box-sizing: border-box;
    .row {
      display: flex;
      height: 240px;
      .col {
        flex: 2;
        // background-color: red;
        color: #fff;
        ul {
          li {
            font-size: 18px;
            line-height: 18px;
            margin-bottom: 14px;
          }
        }
      }
      .code {
        flex: 1;
        // background-color: green;
      }
    }
  }
}
</style>
