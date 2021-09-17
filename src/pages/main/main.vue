<template>
  <div class="manage fillcontain">
        <div style="-webkit-app-region: drag;">
          <el-menu
          :default-active="defaultActive"
          style="min-width: 100%; overflow-x:auto"
          background-color="#324057"
          text-color="#ffffff"
          mode="horizontal"
          unique-opened
          router
        >
          <el-menu-item index="/main">自选</el-menu-item>
          <el-menu-item index="/other/btc_usdt">期货</el-menu-item>
        </el-menu>
        </div>
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: '/main',
    }
  },
  computed: {
    
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin";
.el-menu {
  color: #fff;
}

.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  min-width: 140px;
}

.el-menu-item.is-active {
  color: #fff !important;
}
</style>
