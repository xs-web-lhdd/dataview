<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
      <router-link to="/" v-if="index === 0">{{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item> -->

    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",
  computed: {
    breadList() {
      // return this.$route.matched;
      return ["首页", "主页"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
