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
        <span class="item-title">卖五</span
        ><span class="item-value">{{user.account}}</span><span class="item-key">15</span>
      </div>
      <div class="item">
        <span class="item-title">买一</span
        ><span class="item-value">100000</span><span class="item-key">15</span>
      </div>
      <div class="item">
        <span class="item-title">涨停</span
        ><span class="item-value">100000</span>
      </div>
      <div class="item">
        <span class="item-title">昨收</span
        ><span class="item-value">100000</span>
      </div>
    </div>
    <div class="container" v-else>
      <div class="item">
        <span class="item-title">卖出</span
        ><span class="item-value">100000</span><span class="key">2</span>
      </div>
      <div class="item">
        <span class="item-title">涨停</span
        ><span class="item-value">100000</span>
      </div>
      <div class="item">
        <span class="item-title">最新</span
        ><span class="item-value">100000</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  max-height: 300px;
  color: #fff;
  background-color: #1c1d21;

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #323337;
    border-bottom: 1px solid #797979;
    padding: 4px 10px;
    font-size: 11px;
  }

  .container {
    .item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      border-bottom: 1px solid #797979;

      .item-title {
        font-size: 12px;
      }

      .item-value {
        font-size: 12px;
        color: green;
      }

      .item-value {
        font-size: 12px;
        color: red;
      }

      .item-key {
        font-size: 12px;
      }
    }
  }
}
</style>

<script>
export default {
  props: ["user"],
  data() {
    return {
      type: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.user);
    },
    onChange() {
      this.type = !this.type;
    },
  },
};
</script>