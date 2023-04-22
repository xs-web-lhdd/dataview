<!-- 登录页 -->

<script setup>
import FormBanner from "@/assets/images/home/form-banner.png";
import { reactive, ref } from "vue";

const formLogin = reactive({
  username: "",
  password: "",
});
</script>

<template>
  <div class="login">
    <div class="login-box">
      <div class="left">
        <a href=""></a>
        <div class="img"></div>
      </div>
      <div class="right">
        <!-- 登陆表单 -->
        <span class="title">登陆</span>
        <el-form label-width="50px" :model="formLogin" size="default">
          <el-form-item label="账号">
            <el-input v-model="formLogin.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLogin.password" />
          </el-form-item>
        </el-form>
        <div class="opera">
          <div class="opera-btn">登陆</div>
          <span class="opera-tip"
            >还没有账号？<router-link to="/register"
              >注册一个</router-link
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  color: rgba(10, 18, 32, 0.64);
  background: #f1f7fc;
  background: linear-gradient(
      180deg,
      rgba(0, 180, 197, 0.77) 0,
      rgba(86, 235, 182, 0.5) 100%
    ),
    linear-gradient(135deg, #00c5c8 0, #0ed1ab 76.09%, #76e0c8 100%);
  background: linear-gradient(57deg, #80acf6 0, #537ced 100%);
  &-box {
    width: 646px;
    height: 384px;
    margin: 0 auto;
    position: relative;
    top: 100px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2),
      0 26px 24px 0 rgba(12, 23, 44, 0.1);
    background-color: #fff;
    .left {
      position: absolute;
      top: 0;
      left: 0;
      width: 300px;
      height: 100%;
      text-align: center;
      background-image: linear-gradient(#4562e9 0, #56b5fe 100%),
        radial-gradient(18% 84%, #5888f5 2%, #586ef5 60%, #7558f4 100%);
      .img {
        position: relative;
        left: 50%;
        top: 50%;
        width: 233px;
        height: 233px;
        margin-top: -96.5px;
        margin-left: -116.5px;
        background: url(../../assets/images/home/form-banner.png) center center
          no-repeat;
        background-size: cover;
      }
    }
    .right {
      position: absolute;
      top: 0;
      right: 0px;
      padding: 32px 48px;
      text-align: left;
      background: #fff;
      .title {
        display: inline-block;
        // width: 100%;
        height: 24px;
        color: #586ef5;
        font-size: 14px;
        // text-align: center;
        margin-top: 40px;
        margin-left: 10px;
        font-weight: 700;
        box-shadow: inset 0 -1px 0 #5182e4, 0 1px 0 #5182e4;
      }
      .opera {
        margin-top: 30px;
        display: flex;
        &-btn {
          width: 30px;
          padding: 0 32px;
          line-height: 40px;
          border-radius: 40px;
          font-size: 14px;
          background: #2e68dc;
          box-shadow: 0 4px 8px 0 rgba(30, 62, 124, 0.15);
          color: #fff;
        }
        &-tip {
          display: inline-block;
          font-size: 12px;
          line-height: 40px;
          height: 40px;
          margin-left: 5px;
          a {
            color: #5182e4;
          }
        }
      }
    }
  }
}
:deep(.el-form) {
  max-width: 250px !important;
  margin-top: 34px;
}
</style>
