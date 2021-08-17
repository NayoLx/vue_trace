<template>
  <div class="fillcontain">
    <div class="swap">
      <div class="swap-handler">
        <span
          @click="changeOrder('self')"
          :class="{ active: selectedOrder === 'self' }"
          >{{ $t("swap.self") }}</span
        >
        <span
          @click="changeOrder('self_model')"
          :class="{ active: selectedOrder === 'self_model' }"
          >{{ $t("swap.self_model") }}</span
        >
      </div>
      <div v-if="selectedOrder === 'self'">
          <SelfSwap></SelfSwap>
        </div>
        <div v-else>
          <SelfSwapM></SelfSwapM>
      </div>
    </div>
    <div class="row">
      <Dropdown trigger="click" style="margin: 0 20px">
        {{ account }}
        <Icon type="ios-arrow-down"></Icon>
        <DropdownMenu slot="list">
          <DropdownItem
            v-for="item in myAccount"
            v-bind:key="item"
            @click.native="changeAccount(item)"
            >{{ item }}</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
      <div class="row-item">
        {{ $t("common.staticEquity") }}:
        <span v-if="showDetail == true">100000</span><span v-else>******</span>
      </div>
      <div class="row-line"></div>
      <div class="row-item">
        {{ $t("common.occupationDeposit") }}:
        <span v-if="showDetail == true">100000</span><span v-else>******</span>
      </div>
      <div class="row-line"></div>
      <div class="row-item">
        {{ $t("common.availableFunds") }}:
        <span v-if="showDetail == true">100000</span><span v-else>******</span>
      </div>
      <div>
        <Icon v-if="showDetail == true" type="ios-eye" @click="hideAccount()" />
        <Icon v-else type="ios-eye-outline" @click="hideAccount()" />
      </div>
    </div>
    <div style="height: 60%">
      <div class="row-order">
        <div class="row-order-item" style="width: 15%">
          <DiskPort></DiskPort>
        </div>
        <div class="row-order-item" style="width: 30%">
          <Order></Order>
        </div>
        <div class="row-order-item" style="width: 55%">
          <Entrust></Entrust>
        </div>
      </div>
      <div class="row-order">
        <div style="width: 50%; overflow-y: scroll; height: 100%">
          <Position></Position>
        </div>
        <div style="width: 50%; overflow-y: scroll; height: 100%">
          <PositionH></PositionH>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelfSwap from "@/components/swap/self_swap";
import SelfSwapM from "@/components/swap/self_swap_m";
import Order from "@/components/swap/order";
import DiskPort from "@/components/swap/disk_port";
import Position from "@/components/swap/position";
import PositionH from "@/components/swap/position_history";
import Entrust from "@/components/swap/entrust";

export default {
  components: {
    SelfSwap,
    SelfSwapM,
    Order,
    DiskPort,
    PositionH,
    Position,
    Entrust,
  },
  data() {
    return {
      selectedOrder: "self",
      showDetail: true,
      account: "17875865869",
      myAccount: ["17503002125", "17875865869"],
    };
  },
  methods: {
    init() {
      var params = this.$route.params.pair;
      console.log(params);
    },
    handleDragDrop(name, newName, a, b, names) {
      this.tabList.splice(b, 1, ...this.tabList.splice(a, 1, this.tabList[b]));
    },
    changeOrder(str) {
      this.selectedOrder = str;
    },
    changeAccount(str) {
      console.log(str);
      this.account = str;
    },
    hideAccount() {
      this.showDetail = !this.showDetail;
    },
  },
};
</script>

<style>
@import url("//unpkg.com/view-design/dist/styles/iview.css");

</style>

<style lang="less" scoped>
.swap {

  .swap-handler {
    background-color: #192330;
    font-size: 0;

    // line-height: 38px;
    > span {
      padding: 0 20px;
      font-size: 14px;
      display: inline-block;
      cursor: pointer;
      line-height: 40px;
      color: #fff;

      &.active {
        color: #ffffff;
        background-color: #525b68;
      }

      &:first-child {
        border-top-left-radius: 0px;
      }

      &:last-child {
        border-top-right-radius: 0px;
      }
    }
  }
}

.row {
  display: flex;
  width: 100%;
  height: 20px;
  padding: 20px 0;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #323337;
  color: #fff;

  .row-item {
    margin: 0 10px 0 10px;
    color: #ffffff;
    opacity: 75%;
  }

  .row-line {
    width: 2px;
    height: 10px;
    background-color: #525b68;
  }
}

.row-order {
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;

  .row-order-item {
    height: 100%;
    margin: 0 10px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>