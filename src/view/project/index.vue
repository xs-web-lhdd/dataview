<!-- 登陆后项目管理页面 -->

<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- logo部分 -->
      <div class="logo">
        <img src="../../assets/images/logo.png" class="img" alt="" />
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <!-- <el-menu
        class="nav-menu"
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
      >
        <TreeMenu :userMenu="userMenu" />
      </el-menu> -->
      <el-menu
        default-active="/project/items"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        text-color="#fff"
        background-color="transparent"
        router
        active-text-color="#4091ff"
      >
        <el-menu-item index="/project/welcome">
          <el-icon><Grid /></el-icon>
          <span>欢迎光临</span>
        </el-menu-item>
        <el-sub-menu index="/project/">
          <template #title>
            <el-icon><location /></el-icon>
            <span>我的项目</span>
          </template>
          <el-menu-item index="/project/items">全部</el-menu-item>
          <el-menu-item index="/project/published">已发布</el-menu-item>
          <el-menu-item index="/project/unpublish">未发布</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/project/template">
          <el-icon><setting /></el-icon>
          <span>模板市场</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <el-icon><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
          </div>
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <div class="userinfo">
          <!-- <el-badge
            :is-dot="$store.state.noticeCount > 0 ? true : false"
            class="notice"
            type="danger"
            @click="$router.push('/audit/approve')"
          >
            <i class="el-icon-bell"></i>
          </el-badge> -->

          <el-dropdown @command="handleLogout">
            <span class="user-link">
              <!-- {{ userInfo?.userName }} -->
              刘豪
              <el-icon class="icon"><User /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱：{{ userInfo?.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TreeMenu from "@/components/TreeMenu/index.vue";
import BreadCrumb from "@/components/BreadCrumb/index.vue";
export default {
  name: "Home",
  components: { TreeMenu, BreadCrumb },
  data() {
    return {
      // userInfo: this.$store.state.userInfo,
      userInfo: null,
      isCollapse: false,
      // 造假数据:
      userMenu: [
        {
          _id: 1,
          menuName: "我的项目",
          menuType: 1,
          menuState: 1,
          path: "/login",
          children: [
            {
              _id: 2,
              menuName: "我的项目啊啊啊啊啊",
              menuType: 1,
              menuState: 1,
            },
          ],
        },
      ],
      activeMenu: location.hash.slice(1),
    };
  },
  mounted() {
    // this.getMenuList();
  },
  methods: {
    handleLogout(key) {
      if (key === "email") return;
      this.$store.commit("saveUserInfo", "");
      this.userInfo = null;
      this.$router.push("/login");
    },
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
    async getMenuList() {
      try {
        const { menuList, actionList } = await this.$api.getPermissionList();
        this.userMenu = menuList;
        this.$store.commit("saveUserMenu", menuList);
        this.$store.commit("saveUserAction", actionList);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-layout {
  position: relative;
  .nav-side {
    overflow: hidden;
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      .img {
        width: 32px;
        height: 32px;
        margin: 0 16px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    transition: margin-left 0.5s;
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #ddd;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
          color: #409eff;
          cursor: pointer;
        }
      }
      .userinfo {
        cursor: pointer;
        .user-link {
          color: #4091ff;
          font-size: 12px;
          line-height: 50px;
          .icon {
            font-size: 18px;
          }
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      min-height: calc(100vh - 50px);
      // .main-page{
      //     height: 100%;
      // }
    }
  }
}
// :deep(.el-menu) {
//   background-color: transparent;
// }
</style>
