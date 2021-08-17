<template>
  <div class="main">
    <div class="title">
      <p>盘口信息[合约名称]</p>
      <div>
        <Icon type="ios-repeat" @click="onChange()"></Icon>
      </div>
    </div>
    <div class="container" v-if="this.type == true">
      <div class="item">
        <span class="title">卖五</span><span class="value">100000</span
        ><span class="key">15</span>
      </div>
      <div class="item">
        <span class="title">买一</span><span class="value">100000</span
        ><span class="key">15</span>
      </div>
      <div class="item">
        <span class="title">涨停</span><span class="value">100000</span>
      </div>
      <div class="item">
        <span class="title">昨收</span><span class="value">100000</span>
      </div>
    </div>
    <div class="container" v-else>
      <div class="item">
        <span class="title">卖出</span><span class="value">100000</span
        ><span class="key">2</span>
      </div>
      <div class="item">
        <span class="title">涨停</span><span class="value">100000</span>
      </div>
      <div class="item">
        <span class="title">最新</span><span class="value">100000</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .container {
    .item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .title {

      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      type: true,
    };
  },
  methods: {
    onChange() {
      this.type = !this.type;
    },
  },
};
</script>