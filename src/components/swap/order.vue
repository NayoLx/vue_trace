<template>
  <div class="main-order">
    <div class="title">
      <span>标准下单板</span>
    </div>
    <Form :model="form" label-position="top">
      <div class="form-row">
        <div class="form-row-item">
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
      width="40%"
      height="500"
      v-dialogDrag
    >
      <template>
        <div style="choose-swap">
          <el-row>
            <el-col :span="6">
              <div style="choose-swap-tree">
                <p>市场/品种</p>
                <div style="choose-swap-tree-list">
                  <el-tree :data="swap_tree" :props="defaultProps" accordion>
                  </el-tree>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div>
                <p>合约</p>
                <el-table :data="tableData" style="width: 100%" height="250px">
                  <el-table-column prop="code" label="交易代码">
                  </el-table-column>
                  <el-table-column prop="head" label="默认下单手数">
                  </el-table-column>
                  <el-table-column prop="code" label="交易代码">
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <div class="choose-swap-footer">
            <p>市场/品种</p>
            <div>
              <p>合约名称 每手xx吨 交易所</p>
              <p>报价单位：元（人民币）/吨</p>
            </div>
            <div>
              <el-button type="primary" plain size="mini" @click="onChooseSubmit()"
                >确定</el-button
              >
              <el-button size="mini">取消</el-button>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>

    <el-dialog title="操作确认"
      :visible.sync="submitVisible"
      width="30%"
      v-dialogDrag>
      <template>
        <div>
          <p>确定下单 吗？</p>
          <div></div>
          <el-button type="primary" plain size="mini" @click="onChooseSubmit()"
                >确定</el-button
              >
              <el-button size="mini">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less">
.choose-swap {
  width: 100%;
  min-height: 500px;

  .choose-swap-tree {
    height: 200px;
  }
}
.main-order {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  background-color: #1c1d21;
  color: #ffffff;

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

export default {
  props: ["user"],
  data() {
    return {
      tableData: [],
      swap_tree: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
            },
            {
              label: "二级 2-2",
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
            },
            {
              label: "二级 3-2",
            },
          ],
        },
      ],
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
      sides: ["1", "2"],
      tifs: ["1", "2"],
      ordTypes: ["1", "2"],
      openFlags: ["1", "2"],
      hedgeFlags: ["1", "2"],
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
    //使用前，先解绑order，以防重复绑定
    EventBus.$off('order');
    EventBus.$on('order', (msg) => {
      console.log('收到收到');
      console.log(msg.contractName);
    });
  },
  methods: {
    init() {
      console.log(this.user);
    },
    changeReadOnly() {
      this.isReadOnly = !this.isReadOnly;
    },
    onSubmit() {
      this.submitVisible = true;
      console.log(this.form);
    },
    onChooseSubmit() {
      console.log(this.form);
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