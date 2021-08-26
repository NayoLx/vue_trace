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
        <SelfSwap :user="account"></SelfSwap>
      </div>
      <div v-else>
        <SelfSwapM :user="account"></SelfSwapM>
      </div>
    </div>
    <div class="row">
      <div class="row-left">
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
          <span v-if="showDetail == true">100000</span
          ><span v-else>******</span>
        </div>
        <div class="row-line"></div>
        <div class="row-item">
          {{ $t("common.occupationDeposit") }}:
          <span v-if="showDetail == true">100000</span
          ><span v-else>******</span>
        </div>
        <div class="row-line"></div>
        <div class="row-item">
          {{ $t("common.availableFunds") }}:
          <span v-if="showDetail == true">100000</span
          ><span v-else>******</span>
        </div>
        <div>
          <Icon
            v-if="showDetail == true"
            type="ios-eye"
            @click="hideAccount()"
          />
          <Icon v-else type="ios-eye-outline" @click="hideAccount()" />
        </div>
      </div>
      <div class="row-right">
        <i class="el-icon-s-tools" @click="setVisible = true" />
      </div>
    </div>
    <div class="row-down" style="height: 60%">
      <div class="row-order">
        <div class="row-order-item" style="width: 300px">
          <DiskPort :user="account"></DiskPort>
        </div>
        <div class="row-order-item" style="width: 700px">
          <Order :user="account"></Order>
        </div>
        <div class="row-order-item" style="width: 100%">
          <Entrust :user="account"></Entrust>
        </div>
      </div>
      <div class="row-order">
        <Split v-model="split1">
          <div
            slot="left"
            style="overflow-y: scroll; height: 100%; border: 1px solid #000000"
          >
            <Position></Position>
          </div>
          <div
            slot="right"
            style="overflow-y: scroll; height: 100%; border: 1px solid #000000"
          >
            <PositionH></PositionH>
          </div>
        </Split>
      </div>
    </div>
    <el-dialog
      title="交易设置"
      :visible.sync="setVisible"
      width="60%"
      v-dialogDrag
    >
      <template>
        <div class="setting">
          <el-tabs tab-position="left" style="height: 200px">
            <el-tab-pane label="基本">
              <div class="setting-main">
                <p>下单板</p>
                <el-row style="margin-bottom: 20px">
                  <el-col :span="12"
                    ><div class="setting-panel">
                      <p>默认下单价格</p>
                      <div>
                        <el-select v-model="defaultList.price" placeholder=" ">
                          <el-option
                            v-for="item in price"
                            :key="item"
                            :label="item"
                            :value="item"
                          >
                          </el-option>
                        </el-select>
                      </div></div
                  ></el-col>
                  <el-col :span="12"
                    ><div class="setting-panel">
                      <p>默认有效时间（TIF）</p>
                      <el-select v-model="defaultList.tif" placeholder=" ">
                        <el-option
                          v-for="item in price"
                          :key="item"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select></div
                  ></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"
                    ><div class="setting-panel">
                      <p>默认下单类型</p>
                      <el-select v-model="defaultList.type" placeholder=" ">
                        <el-option
                          v-for="item in price"
                          :key="item"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select></div
                  ></el-col>
                </el-row>
                <p>持仓</p>
                <el-row style="margin-bottom: 20px">
                  <el-col :span="12"
                    ><div class="setting-panel">
                      <p>比例平仓下单方式</p>
                      <div>
                        <el-select v-model="defaultList.orderType" placeholder=" ">
                          <el-option
                            v-for="item in price"
                            :key="item"
                            :label="item"
                            :value="item"
                          >
                          </el-option>
                        </el-select>
                      </div></div
                  ></el-col>
                  <el-col :span="12"
                    ><div class="setting-panel">
                      <p>反手平仓下单方式</p>
                      <el-select v-model="defaultList.reOrderType" placeholder=" ">
                        <el-option
                          v-for="item in price"
                          :key="item"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select></div
                  ></el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="默认手数">默认手数</el-tab-pane>
            <el-tab-pane label="超价">超价</el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </el-dialog>
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
      defaultList: {
        price: "",
        tif: "",
        type: "",
        orderType: "",
        reOrderType: "",
      },
      price: [100, 200, 300],
      setVisible: false,
      split1: 0.5,
      selectedOrder: "self",
      showDetail: true,
      account: "17875865869",
      myAccount: ["17503002125", "17875865869"],
    };
  },
  methods: {
    init() {
      var params = this.$route.params.pair;
      var getUser = this.$userStore.getters.getUser;
      console.log(params);
      console.log(getUser);
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
  justify-content: space-between;
  background-color: #323337;
  color: #fff;
  border-top: 1px solid #797979;
  border-bottom: 1px solid #797979;

  .row-item {
    margin: 0 10px 0 10px;
    color: #ffffff;
    opacity: 75%;
  }

  .row-left {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
  }

  .row-right {
    margin-right: 20px;
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
    overflow-y: scroll;
    overflow-x: hidden;
    border: 0.5px solid #000000;
  }

  .row-down {
    height: 60%;
  }
}

.setting {
  .setting-main {
  }

  .setting-panel {
    display: flex;
    align-items: center;
  }
}
</style>