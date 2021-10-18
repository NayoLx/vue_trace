<template>
  <div class="manage">
    <div class="manage_tab" style="-webkit-app-region: drag">
      <el-menu
        :default-active="defaultActive"
        style="min-width: 100%; overflow-x: auto"
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
import { ipcRenderer } from 'electron';
export default {
  data() {
    return {
      defaultActive: "/main",
    };
  },
  mounted() {
    ipcRenderer.send("resize-window", 1280, 900);
  },
  computed: {},
};
</script>

<style lang="less">
@import "../../style/mixin";
.manage {
  width: 100%;
}

.manage_tab {
  .el-menu--horizontal > .el-menu-item {
    height: 34px;
    line-height: 43px;
    margin: 0 20px;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .el-menu {
    color: #fff;
  }

  .el-menu-item {
    padding: 0;
  }

  .el-menu-item.is-active {
    color: #fff !important;
  }
}
</style>
