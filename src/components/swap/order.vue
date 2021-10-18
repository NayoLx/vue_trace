<template>
  <div class="main-order">
    <div class="title">
      <span>标准下单板</span>
    </div>
    <Form :model="form" label-position="top">
      <div class="form-row">
        <div class="form-row-item" style="margin-right: 10px">
          <div class="form-row-item-title-f">
            <div>
              <span>合约</span
              ><Icon type="md-search" @click.native="swapVisible = true" />
            </div>
            <Icon
              :type="isReadOnly == true ? 'md-lock' : 'md-unlock'"
              size="17"
              @click="changeReadOnly()"
            />
          </div>
          <el-select
            v-model="form.swap"
            filterable
            remote
            v-bind:disabled="isReadOnly"
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="form-row-item">
          <div class="form-row-item-title-f">
            <div><span>手数</span><Icon type="md-search" /></div>
            <span>＜56</span>
          </div>
          <el-input-number
            v-model="form.head"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </div>
      </div>
      <div class="form-row">
        <div class="form-row-item">
          <div class="form-row-item-title-f">
            <span>价格</span>
          </div>
          <el-input-number
            v-model="form.price"
            controls-position="right"
            :step="100"
            style="width: 120px"
            :min="1"
            :max="1000000"
          ></el-input-number>
        </div>
        <div class="form-row-item" style="margin: 0px 10px">
          <div class="form-row-item-title-f">
            <span>方向</span>
          </div>
          <el-select v-model="form.side" placeholder="请选择">
            <el-option
              v-for="item in sides"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="form-row-item">
          <div class="form-row-item-title-f">
            <span>开平</span>
          </div>
          <el-select v-model="form.openFlag" placeholder="请选择">
            <el-option
              v-for="item in openFlags"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-row-item">
          <div class="form-row-item-title-f">
            <span>投保</span>
          </div>
          <el-select v-model="form.hedgeFlag" placeholder="请选择">
            <el-option
              v-for="item in hedgeFlags"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="form-row-item" style="margin: 0px 10px">
          <div class="form-row-item-title-f">
            <span>类型</span>
          </div>
          <el-select v-model="form.ordType" placeholder="请选择">
            <el-option
              v-for="item in ordTypes"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="form-row-item">
          <div class="form-row-item-title-f">
            <span>TIF</span>
          </div>
          <el-select v-model="form.tif" placeholder="请选择">
            <el-option
              v-for="item in tifs"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="text-align: center; margin: 25px 0">
        <el-button type="primary" @click="onSubmit" style="width: 60%"
          >下单</el-button
        >
      </div>
    </Form>
    <div>
      <div>合约名称 品种 每手x吨 保证金xxx.x元 交易所</div>
    </div>

    <el-dialog
      title="选择合约"
      :visible.sync="swapVisible"
      width="50%"
      height="500"
      v-dialogDrag
    >
      <template>
        <div class="choose-swap">
          <el-row>
            <el-col :span="6" style="padding-right: 10px">
              <div class="choose-swap-tree">
                <p>市场/品种</p>
                <div class="choose-swap-tree-list">
                  <el-tree
                    :data="swap_tree"
                    :props="defaultProps"
                    accordion
                    @node-click="handleNodeClick"
                    :highlight-current="true"
                  >
                  </el-tree>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="choose-swap-tree">
                <p>合约</p>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  height="250px"
                  :header-cell-style="cellStyle"
                  :cell-style="rowStyle"
                  @row-click="onClick"
                >
                  <el-table-column prop="contractCode" label="交易代码">
                  </el-table-column>
                  <el-table-column prop="minimumPrice" label="默认下单手数">
                  </el-table-column>
                  <el-table-column prop="contractName" label="交易代码">
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <div class="choose-swap-footer">
            <p class="choose-swap-footer-title">市场/品种</p>
            <div class="choose-swap-footer-con">
              <p>合约名称 每手xx吨 交易所</p>
              <p>报价单位：元（人民币）/吨</p>
            </div>
            <div class="choose-swap-footer-btn">
              <el-button
                type="primary"
                plain
                size="mini"
                @click="onChooseSubmit()"
                >确定</el-button
              >
              <el-button size="mini" @click="onSwapClose()">取消</el-button>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      title="操作确认"
      :visible.sync="submitVisible"
      width="30%"
      v-dialogDrag
    >
      <template>
        <div>
          <p>确定下单 吗？</p>
          <div></div>
          <el-button type="primary" plain size="mini" @click="onChooseSubmit()"
            >确定</el-button
          >
          <el-button size="mini" @click="onClose()">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less">
.main-order {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 300px;
  background-color: #1c1d21;
  color: #ffffff;

  .el-table .cell {
    color: #ffffff;
  }

  .choose-swap {
    width: 100%;

    .choose-swap-tree {
      p {
        margin: 10px 0;
        color: #ffffff;
      }
    }
  }

  .el-table tbody tr:hover > td {
    background-color: #4286f483 !important;
  }

  .el-input.is-disabled .el-input__inner {
    background-color: #1c1d21;
  }

  .choose-swap-footer {
    margin-top: 20px;

    .choose-swap-footer-title {
      margin: 10px 0;
      color: #ffffff;
    }

    .choose-swap-footer-con {
      width: 100%;
      padding: 5px;
      color: #ffffff;
      border: 2px solid #27282b;
      background-color: #323337;
    }

    .choose-swap-footer-btn {
      margin-top: 20px;
      text-align: end;
    }
  }

  .el-table {
    border: 2px solid #27282b;
  }

  .el-table td,
  .el-table th {
    padding: 5px 0;
  }

  .el-table td,
  .el-table th.is-leaf {
    border: 1px solid #797979;
  }

  .el-table--enable-row-transition .el-table__body td {
    border: 1px solid #797979;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    background-color: #2d2d31;
  }

  .el-table__empty-block {
    background-color: #323337;
  }

  .el-table,
  .el-table__expanded-cell {
    background-color: #323337;
  }

  .el-table::before {
    height: 0px;
  }

  .el-tree-node:focus > .el-tree-node__content {
    background-color: #4286f483;
  }

  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #4286f483;
  }

  .el-tree-node__label {
    color: #ffffff;
  }

  .el-tree-node__content:hover {
    background-color: #4286f483;
  }

  .el-tree {
    height: 250px;
    background-color: #323337;
    border: 2px solid #27282b;
    overflow-x: auto;
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

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #323337;
    border-bottom: 1px solid #797979;
    font-size: 11px;
    position: sticky;
    z-index: 10;
    top: 0;

    span {
      padding: 4px 10px;
      color: #ffffff;
      background-color: #525b68;
    }
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;

    .form-row-item-title {
      padding: 5px 0;
    }

    .form-row-item-title-f {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
  }
}
</style>

<script>
import { EventBus } from "@/utils/event_bus.js";
import { ShowToast } from "@/utils/utils.js";

export default {
  props: ["user"],
  data() {
    return {
      tableData: [],
      swap_tree: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      //弹窗
      submitVisible: false,
      swapVisible: false,
      isReadOnly: false,
      loading: false,
      options: [],
      sides: ["买入", "卖出"],
      tifs: ["DAY", "GTC", "GTD", "FOK", "FAK", "IOC"],
      ordTypes: ["Limit", "Market", "Stop"],
      openFlags: ["开仓", "平仓", "平今", "自动"],
      hedgeFlags: ["投机", "套保"],
      form: {
        swap: "",
        price: 0,
        head: 1,
        side: "",
        tif: "",
        ordType: "",
        openFlag: "",
        hedgeFlag: "",
      },
      activeRow: "",
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.list = this.states.map((item) => {
      return { value: `${item}`, label: `${item}` };
    });
    (this.form = {
      swap: "",
      price: 0,
      head: 1,
      side: "买入",
      tif: "DAY",
      ordType: "Limit",
      openFlag: "开仓",
      hedgeFlag: "投机",
    }),
      //使用前，先解绑order，以防重复绑定
      EventBus.$off("order");
    EventBus.$on("order", (msg) => {
      console.log("收到收到");
      console.log(msg.contractName);
      this.form.swap = msg.contractName;
    });
  },
  methods: {
    init() {
      console.log(this.user);
      this.setSwapTree();
    },
    onClick(row, column, event) {
      this.activeRow = row;
    },
    //市场/品种
    setSwapTree() {
      let exchanges = this.$session.get("exchange");
      let product = this.$session.get("product");
      if (product != null && exchanges != null) {
        this.swap_tree = [];
        for (var i = 0; i < exchanges.length; i++) {
          var exchange = exchanges[i];
          var product_l = [];
          var product_l = product.filter((item) => {
            return item.exchange.id == exchange.id;
          });
          let children = product_l.map((item) => {
            return {
              label: item.name,
            };
          });
          this.swap_tree.push({
            label: exchange.memo,
            children: children,
          });
        }
      } else {
        ShowToast({
          msg: "缓存已失效，请重新登陆",
          isBack: true,
        });
      }
    },
    //选择品种
    handleNodeClick(data) {
      let products = this.$session.get("product");
      if (products != null) {
        var product = products.find((item) => {
          return item.name == data.label;
        });
        if (product != null && product != undefined) {
          let contract = this.$session.get("contract");
          var table = contract.filter((item) => {
            return item.product.id == product.id;
          });
          console.log(table);
          this.tableData = table;
        }
      } else {
        ShowToast({
          msg: "缓存已失效，请重新登陆",
          isBack: true,
        });
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #2d2d31; color: #fff; height: 20px";
    },
    rowStyle({ row, column, rowIndex, columnIndex }) {
      if (row == this.activeRow) {
        return "background-color: #4286f4 !important;";
      }
      return "background-color: #1c1d21; cursor: pointer;";
    },

    changeReadOnly() {
      this.isReadOnly = !this.isReadOnly;
    },
    onSubmit() {
      this.submitVisible = true;
      console.log(this.form);
    },
    onSwapClose() {
      this.swapVisible = false;
    },
    onChooseSubmit() {
      console.log(this.activeRow);
      this.form.swap = this.activeRow.contractName;
      this.onSwapClose();
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
  },
};
</script>