<template>
  <div class="add-swap">
    <div class="add-swap-header">
      <el-row>
        <el-col :span="8"
          ><el-input
            placeholder="请搜索"
            suffix-icon="el-icon-search"
            v-model="searchKey"
            @input="search()"
          >
          </el-input
        ></el-col>
        <el-col :span="16">
          <div class="add-swap-header-item">
            <p>交易所</p>
            <div>
              <el-select
                v-model="value"
                placeholder="请选择"
                @change="onChangeExchange()"
              >
                <el-option
                  v-for="item in options"
                  :key="item.memo"
                  :label="item.memo"
                  :value="item.memo"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="add-swap-content">
      <div style="width: 44%">
        <div class="add-swap-content-title">
          <p>合约列表</p>
          <div class="line"></div>
        </div>
        <el-table
          ref="addMultipleTable"
          :data="searchList"
          height="300"
          :header-cell-style="cellStyle"
          :cell-style="rowStyle"
          @selection-change="add"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column label="交易代码" prop="contractCode">
          </el-table-column>
          <el-table-column prop="contractName" label="合约名称">
          </el-table-column>
        </el-table>
      </div>

      <div class="add-swap-content-btn-list">
        <div
          class="add-swap-content-btn"
          :class="{ active: this.addList.length > 0 }"
          @click="setAdd()"
        >
          添加
        </div>
        <div
          class="add-swap-content-btn"
          :class="{ active: this.deleteList.length > 0 }"
          @click="setDelete()"
        >
          删除
        </div>
      </div>

      <div style="width: 44%">
        <div class="add-swap-content-title">
          <div>
            <Dropdown
              trigger="click"
              style="margin: 0 20px; color: #fff; margin-bottom: 10px"
            >
              <span v-if="selectGroup.groupName == null">合约组名称</span
              ><span v-else>{{ selectGroup.groupName }}</span>
              <Icon type="ios-arrow-down"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem
                  v-for="item in swapGroup"
                  v-bind:key="item.id"
                  @click.native="change(item)"
                  >{{ item.groupName }}</DropdownItem
                >
              </DropdownMenu>
            </Dropdown>
          </div>
          <div class="line">
            <i class="el-icon-edit-outline" @click="iEdit()" />
            <i class="el-icon-plus" @click="iAdd()" />
            <i class="el-icon-delete-solid" @click="iDelete()" />
          </div>
        </div>
        <el-table
          ref="deleteMultipleTable"
          :data="contractList"
          height="300"
          :header-cell-style="cellStyle"
          :cell-style="rowStyle"
          @selection-change="deleteItem"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column label="日期" prop="contractCode"> </el-table-column>
          <el-table-column prop="contractName" label="合约名称">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="add-swap-btn">
      <el-button type="primary" plain size="mini" @click="onSubmitBack()"
        >确定</el-button
      >
      <el-button size="mini" @click="onBack()">取消</el-button>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="addVisible"
      width="25%"
      v-dialogDrag
      :modal="false"
    >
      <template>
        <div class="add-dialog-main">
          <div v-if="dialogType == 'add'">
            <p>请输入合约组的名称</p>
            <el-input
              type="text"
              size="mini"
              placeholder="请输入内容"
              v-model="new_name"
              maxlength="20"
              show-word-limit
            ></el-input>
            <div class="add-dialog-btn">
              <el-button type="primary" plain size="mini" @click="onSubmit()"
                >确定</el-button
              >
              <el-button size="mini">取消</el-button>
            </div>
          </div>
          <div v-else-if="dialogType == 'edit'">
            <p>原名称：{{ selectGroup.groupName }}</p>
            <div style="display: flex; align-item: center">
              <p style="text-align: start; flex: 3">新名称：</p>
              <el-input
                type="text"
                size="mini"
                placeholder="请输入内容"
                v-model="new_name"
                maxlength="20"
                show-word-limit
              ></el-input>
            </div>
            <div class="add-dialog-btn">
              <el-button type="primary" plain size="mini" @click="onSubmit()"
                >确定</el-button
              >
              <el-button size="mini">取消</el-button>
            </div>
          </div>
          <div v-else-if="dialogType == 'delete'">
            <p style="color: #fff">确认删除当前合约组</p>
            <p style="margin: 15px 0">(组内合约也会被删除)</p>
            <div class="add-dialog-btn">
              <el-button type="primary" plain size="mini" @click="onSubmit()"
                >确定</el-button
              >
              <el-button size="mini">取消</el-button>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import web from "@/config/web";
import { Loading, Message } from 'element-ui';

export default {
  props: ["groundId", "swapGroup", "onClose"],
  data() {
    return {
      title: "",
      options: [],
      searchKey: "",
      value: "",
      dialogType: "",
      selectGroup: "",
      new_name: "",
      addVisible: false,
      contractList: [], //合约组里得所有合约
      addList: [], //新增列表
      deleteList: [], //删除列表
      searchList: [], //搜索列表
      list: [], //合约总列表
    };
  },
  methods: {
    init() {
      this.getOptions();
    },
    getOptions() {
      let exchange = this.$session.get("exchange");
      let contract = this.$session.get("contract");
      if (exchange != null && contract != null) {
        this.selectGroup = this.swapGroup[0];
        this.options = exchange;
        this.value = this.options[0].memo;
        for (var i = 0; i < contract.length; i++) {
          if (contract[i].product.exchange.memo == this.value) {
            this.list.push(contract[i]);
          }
        }
        this.contractList = this.selectGroup.contractData;
      } else {
        ShowToast({
          msg: "缓存已失效，请重新登陆",
          isBack: true,
        });
      }
    },
    onChangeExchange() {
      let contract = this.$session.get("contract");
      this.list = [];
      for (var i = 0; i < contract.length; i++) {
        if (contract[i].exchange.memo == this.value) {
          this.list.push(contract[i]);
        }
      }
      this.searchList = this.list;
      this.searchKey = "";
    },
    change(value) {
      this.selectGroup = value;
      if (this.selectGroup != null && this.selectGroup.groupId != null) {
        web
          .request({
            url: "/fospot/counter/api/quotation/view_group",
            method: "post",
            data: {
              groupId: this.selectGroup.groupId,
            },
          })
          .then((res) => {
            if (res != null && res.data != null) {
              this.contractList = res.data.data;
            }
          });
      }
    },
    //订阅
    setAdd() {
      var that = this;
      var contractIds = [];
      that.addList.forEach(function (value, index, arr) {
        var contractItem = that.contractList.find(
          (item) => item.id == value.id
        );
        if (contractItem == null) {
          contractIds.push(value.id);
        }
      });
      if (contractIds.length > 0) {
        web
          .request({
            url: this.api.swap.addSwap,
            method: "post",
            data: {
              groupId: that.selectGroup.groupId,
              contractIds: contractIds,
            },
          })
          .then((res) => {
            if (res != null && res.data.code == 200) {
              that.addList.forEach(function (value, index, arr) {
                var contractItem = that.contractList.find(
                  (item) => item.id == value.id
                );
                if (contractItem == null) {
                  that.contractList.push(value);
                }
              });
              that.addList = [];
              this.$refs.addMultipleTable.clearSelection();
            }
          });
      } else {
        that.addList = [];
        this.$refs.addMultipleTable.clearSelection();
      }
    },
    //取消订阅
    setDelete() {
      var that = this;
      var contractIds = [];
      that.deleteList.forEach(function (value, index, arr) {
        var contractItem = that.contractList.find(
          (item) => item.id == value.id
        );
        if (contractItem != null) {
          contractIds.push(value.id);
        }
      });
      if (contractIds.length > 0) {
        web
          .request({
            url: this.api.swap.deleteSwap,
            method: "post",
            data: {
              groupId: that.selectGroup.groupId,
              contractIds: contractIds,
            },
          })
          .then((res) => {
            if (res != null && res.data.code == 200) {
              that.deleteList.forEach(function (value, index, arr) {
                var contractItem = that.contractList.find(
                  (item) => item.id == value.id
                );
                if (contractItem != null) {
                  let index = that.contractList.findIndex(
                    (item) => item.id == value.id
                  );
                  that.contractList.remove(index);
                }
              });
              this.$refs.deleteMultipleTable.clearSelection();
            }
          });
      } else {
        that.addList = [];
        this.$refs.addMultipleTable.clearSelection();
      }
    },
    //后退刷新
    onSubmitBack() {
      this.onClose(true);
    },
    onBack() {
      this.onClose();
    },
    deleteItem(value) {
      this.deleteList = value;
    },
    add(value) {
      this.addList = value;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #2d2d31; color: #fff; height: 20px";
    },
    rowStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #1c1d21";
    },
    search() {
      this.searchList = this.list.filter(
        (item) => item.contractName.indexOf(this.searchKey) >= 0
      );
    },
    iEdit() {
      if (this.selectGroup != null && this.selectGroup.groupName != null) {
        console.log("edit");
        this.title = "编辑合约组";
        this.addVisible = true;
        this.dialogType = "edit";
      }
    },
    iAdd() {
      this.title = "新建合约组";
      this.addVisible = true;
      this.dialogType = "add";
    },
    iDelete() {
      if (this.selectGroup != null && this.selectGroup.groupName != null) {
        this.title = "操作确认";
        this.addVisible = true;
        this.dialogType = "delete";
      }
    },
    onRefresh() {
      web
        .request({
          url: "/fospot/counter/api/quotation/init/view",
          method: "get",
        })
        .then((res) => {
          if (res != null && res.data != null) {
            this.swapGroup = res.data.data;
          }
        });
    },
    //弹窗确认
    onSubmit() {
      var that = this;
      if (this.dialogType == "add") {
        web
          .request({
            url: this.api.swap.addGroup,
            method: "post",
            data: {
              groupName: that.new_name,
            },
          })
          .then((res) => {
            console.log(res);
            if (res != null && res.data != null && res.data.code == 200) {
              that.addVisible = false;
              that.new_name = "";
              this.onRefresh();
            }
          });
      } else if (that.dialogType == "edit") {
        web
          .request({
            url: that.api.swap.updateGroup,
            method: "post",
            data: {
              groupId: that.selectGroup.groupId,
              groupName: that.new_name,
            },
          })
          .then((res) => {
            console.log(res);
            if (res != null && res.data != null && res.data.code == 200) {
              that.addVisible = false;
              that.selectGroup.groupName = that.new_name;
              that.new_name = "";
            }
          });
      } else if (that.dialogType == "delete") {
        web
          .request({
            url: that.api.swap.removeGroup,
            method: "post",
            data: {
              groupId: that.selectGroup.groupId,
            },
          })
          .then((res) => {
            console.log(res);
            if (res != null && res.data != null && res.data.code == 200) {
              that.addVisible = false;
              let index = that.swapGroup.findIndex(
                (item) => item.groupId == that.selectGroup.groupId
              );
              that.swapGroup.remove(index);
              that.selectGroup = that.swapGroup[0];
            }
          });
      }
    },
  },
  mounted() {
    this.init();
    this.searchList = this.list;
  },
};
</script>

<style lang="less">
.add-swap {
  text-align: center;
  height: auto;
  max-height: 500px;
  background-color: #2d2d31;

  .add-dialog-main {
    .el-dialog__body {
      padding: 20px 20px;
    }

    .add-dialog-btn {
      margin-top: 10px;
      text-align: end;
    }

    .el-input__inner {
      border: none;
      margin: 10px 0;
    }

    .el-input--mini .el-input__inner {
      background-color: #000000;
      color: #ffffffcb;
    }

    .el-input .el-input__count .el-input__count-inner {
      background-color: #000000;
      color: #ffffff;
    }
  }

  .add-dialog-main {
    p {
      color: #ffffffcb;
      text-align: start;
    }
  }

  .el-dialog {
    background-color: #2d2d31;
    border: 1px solid #797979;
  }

  .add-swap-header {
    display: flex;
    justify-content: space-between;
  }

  .add-swap-header-item {
    display: flex;
    align-items: center;
    margin-left: 40px;

    p {
      text-align: center;
      width: 50px;
      color: #ffffffcb;
    }
  }

  .add-swap-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    .add-swap-content-list {
      display: flex;
      height: 30px;
      align-items: center;
    }
    .add-swap-content-list:hover {
      background-color: #4286f43b;
    }
    .i-add:hover {
      color: #4286f4;
    }
  }

  .add-swap-content-title {
    display: flex;
    justify-content: space-between;

    .line {
      color: #fff;

      i {
        margin: 0 3px;
      }
    }

    p {
      text-align: left;
      color: #ffffffcb;
      margin-bottom: 10px;
    }
  }

  .add-swap-btn {
    text-align: right;
  }

  .el-table th > .cell {
    padding-left: 14px;
    padding-right: 14px;
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

  .el-table .cell {
    color: #ffffffcb;
  }

  .el-table::before {
    background-color: #1c1d21;
  }

  .el-table__body-wrapper {
    background-color: #1c1d21;
  }

  .add-swap-content-btn {
    width: auto;
    padding: 2px 10px;
    margin: 30px 5px;
    font-size: 12px;
    cursor: pointer;
    color: #ffffffcb;
    border: 1px solid #ffffffcb;
  }

  .add-swap-content-btn.active {
    color: #ffffff;
    background-color: #174b94c9;
    border: 1px solid #174b94;
  }
}
</style>