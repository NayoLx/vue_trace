<template>
  <div class="swap_o">
    <div class="swap_o_tabs">
      <el-tabs v-model="selectedOrder" @tab-click="changeOrder">
        <el-tab-pane label="报价表" name="self"
          ><SelfSwap :user="account"></SelfSwap
        ></el-tab-pane>
        <el-tab-pane label="期权报价表" name="s_self"
          ><SelfSwapM :user="account"></SelfSwapM
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="row">
      <div class="row-left">
        <Dropdown trigger="click" style="margin: 0 20px">
          {{ account.account }}
          <Icon type="ios-arrow-down"></Icon>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="item in myAccount"
              v-bind:key="item.id"
              @click.native="changeAccount(item)"
              >{{ item.account }}</DropdownItem
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
    <el-row :gutter="5">
      <el-col :xs="4" :sm="4" :md="3" :lg="3" :xl="2"
        ><DiskPort :user="account"></DiskPort
      ></el-col>
      <el-col :xs="9" :sm="9" :md="7" :lg="6" :xl="5">
        <Order :user="account"></Order
      ></el-col>
      <el-col :xs="11" :sm="11" :md="14" :lg="15" :xl="17"
        ><Entrust :user="account"></Entrust
      ></el-col>
    </el-row>
    <el-row :gutter="5" style="border-top: 1px solid #797979">
      <el-col :span="12"><Position></Position></el-col>
      <el-col :span="12"><PositionH></PositionH></el-col>
    </el-row>
  
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
                <div class="setting-main-title">
                  <p>下单板</p>
                  <div class="line"></div>
                </div>
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
                <el-row style="margin-bottom: 20px">
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
                <div class="setting-main-title">
                  <p>持仓</p>
                  <div class="line"></div>
                </div>
                <el-row style="margin-bottom: 20px">
                  <el-col :span="12"
                    ><div class="setting-panel">
                      <p>比例平仓下单方式</p>
                      <div>
                        <el-select
                          v-model="defaultList.orderType"
                          placeholder=" "
                        >
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
                      <el-select
                        v-model="defaultList.reOrderType"
                        placeholder=" "
                      >
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
import web from "@/config/web";

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
      account: "",
      myAccount: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var params = this.$route.params.pair;
      console.log(params);
      this.getAccount();
      this.getTradTimeInfo();
      this.getExchangeSettleParam();
      this.getExchangeTradeParam();
    },
    handleDragDrop(name, newName, a, b, names) {
      this.tabList.splice(b, 1, ...this.tabList.splice(a, 1, this.tabList[b]));
    },
    //用户所有交易账户查询
    getAccount() {
      web
        .request({
          url: this.api.common.tradeAccount,
          method: "get",
        })
        .then((res) => {
          this.$session.set("account", res.data.data, 60);
          this.myAccount = res.data.data;
          this.account = this.myAccount[0];
        });
    },
    //所有交易时间
    getTradTimeInfo() {
      web
        .request({
          url: this.api.common.tradeTimeInfo,
          method: "get",
        })
        .then((res) => {
          console.log("getTradTimeInfo");
          console.log(res.data.data);
        });
    },
    //所有交易所结算参数
    getExchangeSettleParam() {
      web
        .request({
          url: this.api.common.exchangeSettleParam,
          method: "get",
        })
        .then((res) => {
          console.log("exchangeSettleParam");
          console.log(res.data.data);
        });
    },
    //所有交易所交易参数
    getExchangeTradeParam() {
      web
        .request({
          url: this.api.common.exchangeTradeParam,
          method: "get",
        })
        .then((res) => {
          console.log("getExchangeTradeParam");
          console.log(res.data.data);
        });
    },
    changeOrder(tab, event) {
      console.log(tab.$options.propsData.name);
      this.selectedOrder = tab.$options.propsData.name;
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

<style lang="less">
html body .swap_o {
  height: 100%;
  background-color: #323337;
}

.swap_o {
  padding: 6px;

  .el-tabs__item.is-active {
    background-color: #7c7f80;
    color: #ffffff;
  }

  .el-tabs__content {
    position: unset;
  }

  .el-tabs__active-bar {
    width: 0 !important;
  }

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__item {
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    padding: 0 20px !important;
  }

  .el-tabs__nav-scroll {
    background-color: rgba(50, 51, 55, 0.9);
  }

  .el-tabs__nav-wrap::after {
    height: 0px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
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

  
  .el-dialog {
    background-color: #2d2d31;
  }

  .el-dialog__title {
    color: #ffffff;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }

  .el-dialog__header {
    padding: 10px 20px;
    border-bottom: 1px solid #797979;
  }

  .el-dialog__headerbtn {
    top: 15px;
  }

  .setting {
    color: #fff;

    .setting-main {
      .setting-main-title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        p {
          min-width: 55px;
        }

        .line {
          width: 100%;
          background-color: #fff;
          height: 1px;
        }
      }
    }

    .setting-panel {
      display: flex;
      align-items: center;
      margin: 0 10px;

      p {
        width: 100%;
      }
    }

    .el-tabs__item {
      color: #fff;
    }

    .el-tabs__item.is-active {
      color: #409eff;
    }

    .el-input--suffix .el-input__inner {
      background-color: #1c1d21;
      color: #fff !important;
      height: 30px;
      border: 1px solid #797979 !important;
    }

    .el-input-number.is-controls-right .el-input__inner {
      background-color: #1c1d21;
      color: #fff !important;
      height: 30px;
      border: 1px solid #797979 !important;
    }

    .el-input-number__decrease,
    .el-input-number__increase {
      border: none;
    }

    .el-input-number.is-controls-right .el-input-number__decrease,
    .el-input-number.is-controls-right .el-input-number__increase {
      line-height: 15px;
    }

    .el-input-number {
      line-height: 30px;
    }

    .el-input-number.is-controls-right .el-input-number__decrease {
      background-color: #1c1d21;
      color: #fff !important;
      border: none;
    }

    .el-input-number.is-controls-right .el-input-number__increase {
      background-color: #1c1d21;
      color: #fff !important;
      border: none;
    }

    .el-input__icon {
      width: 25px;
      line-height: 30px;
    }
  }
}
</style>