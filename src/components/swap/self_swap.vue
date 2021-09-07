<style lang="less">
.self_swap {
  width: 100%;
  color: #fff;
  background-color: #2d2d31;

  // background-color: #283d45 !important;
  // background-color: #1c1d21;

  .self_swap {
    border: none;
  }

  .swap_group {
    display: flex;

    .swap_group_item {
      width: auto;
      padding: 2px 5px;
      margin: 10px 5px;
      font-size: 12px;
      border: 1px solid #797979;
    }

    .swap_group_item.active {
      color: #ffffff;
      background-color: #174b94c9;
      border: 1px solid #174b94;
    }

    .swap_group_item:hover {
      cursor: pointer;
      color: #ffffff;
      background-color: #174b94c9;
      border: 1px solid #174b94;
    }
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

  .el-table::before {
    color: #2d2d31;
  }

  .self-swap-table {
    height: 300px;
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

  .el-cascader-menu__wrap {
    height: auto;
  }

  .el-table tbody tr:hover > td {
    background-color: #4286f483 !important;
  }
}
</style>

<style>
.contextmenu__item {
  display: block;
  line-height: 34px;
  text-align: center;
}
.contextmenu__item:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.menu {
  position: absolute;
  background-color: #fff;
  /*height: 106px;*/
  font-size: 12px;
  color: #444040;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  white-space: nowrap;
  z-index: 1000;
}
.contextmenu__item:hover {
  cursor: pointer;
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
</style>

<template>
  <div class="self_swap" @click="foo()">
    <div class="swap_group" @contextmenu.prevent="divRightClick($event)">
      <div
        class="swap_group_item"
        v-for="item in swapGroup"
        v-bind:key="item.groupId"
        @click="changeGroup(item.groupId)"
        :class="{ active: selected === item.groupId }"
      >
        {{ item.groupName }}
      </div>
    </div>
    <div class="self-swap-table">
      <el-table
        row-key="id"
        :data="tableData"
        @row-contextmenu="rightClick"
        style="width: 100%; color: #fff"
        :header-cell-style="cellStyle"
        :cell-style="rowStyle"
        @row-click="onDblClick"
      >
        <el-table-column width="50" align="center">
          <template slot="header">
            <el-dropdown trigger="click" style="color: #fff">
              <i class="el-icon-s-tools"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="addSwap()"
                  >添加合约</el-dropdown-item
                >
                <el-dropdown-item @click.native="setSort()"
                  >标记排序</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.$index }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合约" prop="contractCode" width="150">
        </el-table-column>
        <el-table-column label="合约名" prop="contractName" width="150">
        </el-table-column>
        <el-table-column label="最新价" prop="type" width="150">
        </el-table-column>
        <el-table-column label="涨跌" prop="direction" width="150">
        </el-table-column>
        <el-table-column label="买价" prop="price" width="150">
        </el-table-column>
        <el-table-column label="卖价" prop="amount" width="150">
        </el-table-column>
        <el-table-column label="买量" prop="turnover" width="150">
        </el-table-column>
        <el-table-column label="卖量" prop="tradedAmount" width="150">
        </el-table-column>
        <el-table-column label="总量" prop="operate"> </el-table-column>
        <el-table-column label="持仓量" prop="tradedAmount" width="150">
        </el-table-column>
        <el-table-column label="涨停价" prop="tradedAmount" width="150">
        </el-table-column>
        <el-table-column label="涨跌价" prop="tradedAmount" width="150">
        </el-table-column>
      </el-table>
    </div>

    <div id="contextmenu" v-show="menuVisible" class="menu">
      <el-cascader-panel
        v-model="cascaderValue"
        :options="options"
        ref="cascaderRef"
        @change="onChange"
        :props="{ expandTrigger: 'hover' }"
        clearable
      ></el-cascader-panel>
    </div>

    <div id="div_contextmenu" v-show="divMenuVisible" class="menu">
      <el-cascader-panel
        v-model="cascaderValue"
        :options="dieOptions"
        ref="cascaderRef"
        @change="onChange"
        :props="{ expandTrigger: 'hover' }"
        clearable
      ></el-cascader-panel>
    </div>

    <el-dialog
      title="添加自选合约"
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="false"
      v-dialogDrag
    >
      <AddSwap
        :groundId="selected"
        :swapGroup="swapGroup"
        :onClose="onClose"
      ></AddSwap>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import AddSwap from "./add_swap.vue";
import web from "@/config/web";
import { EventBus } from "@/utils/event_bus.js";

export default {
  props: ["user"],
  components: {
    AddSwap,
  },
  data() {
    return {
      canSort: true,
      cascaderValue: "",
      dieOptions: [
        {
          value: "add",
          label: "设置合约",
        },
      ],
      options: [],
      dialogVisible: false,
      menuVisible: false,
      divMenuVisible: false,
      selected: "",
      tableData: [],
      swapGroup: [],
      activeRow: "",
      rightClickRow: "",
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.init();
    this.rowDrop();
    this.updated();
  },
  methods: {
    //拖拽方法
    updated() {
      const tbody = document.querySelector(".swap_group");
      const that = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = that.swapGroup.splice(oldIndex, 1)[0];
          that.swapGroup.splice(newIndex, 0, currRow);
          that.sortSwapGroup();
        },
      });
    },
    //排序接口
    sortSwapGroup() {
      var groupIds = [];
      for (var i = 0; i < this.swapGroup.length; i++) {
        groupIds.push(this.swapGroup[i].groupId);
      }
      web.request({
        url: this.api.swap.sortGroup,
        method: "post",
        data: {
          groupIds: groupIds,
        },
      });
    },
    //dialog方法
    onClose(result) {
      this.dialogVisible = false;
      if (result == true) {
        this.init();
      }
    },
    setSort() {
      this.canSort = !this.canSort;
      this.rowDrop();
    },
    //初始化
    init() {
      this.getGroup();
    },
    getGroup() {
      web
        .request({
          url: this.api.swap.initView,
          method: "get",
        })
        .then((res) => {
          if (res != null && res.data != null) {
            this.swapGroup = res.data.data;
            this.groupOptions = [];
            if (this.swapGroup.length > 0) {
              this.selected = this.swapGroup[0].groupId;
              this.setOptions();
              this.getTableData();
            }
          }
        });
    },
    //设置右键菜单
    setOptions() {
      var groupOptions = [];
      if (this.swapGroup.length > 0) {
        this.swapGroup.forEach((item, index) => {
          groupOptions.push({
            value: item.groupId,
            label: item.groupName,
          });
        });
      }
      this.options = [
        {
          value: "order",
          label: "下单",
        },
        {
          value: "move",
          label: "移动到",
          children: groupOptions,
        },
        {
          value: "add",
          label: "设置合约",
        },
        {
          value: "delete",
          label: "删除",
        },
      ];
    },
    getTableData() {
      var that = this;
      web
        .request({
          url: that.api.swap.viewGroup,
          method: "post",
          data: {
            groupId: that.selected,
          },
        })
        .then((res) => {
          if (res != null && res.data != null) {
            that.tableData = res.data.data;
          }
        });
    },
    changeGroup(val) {
      this.selected = val;
      this.getTableData();
    },
    //行双击
    onDblClick(row, column, event) {
      EventBus.$emit("order", row);
      this.activeRow = row;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #2d2d31; color: #fff; height: 20px";
    },
    rowStyle({ row, column, rowIndex, columnIndex }) {
      if (row == this.activeRow) {
        return "background-color: #4286f4 !important;";
      }
      return "background-color: #1c1d21";
    },
    addSwap() {
      this.dialogVisible = true;
    },
    //右键
    onChange(value) {
      this.cascaderValue = [];
      if (value == "order") {
        EventBus.$emit("order", this.rightClickRow);
      } else if (value == "add") {
        this.addSwap();
      } else if (value == "delete") {
        this.onDelete();
      } else if (value[0] == "move") {
        console.log(value);
        this.onMove();
      }
    },
    //删除
    onDelete() {
      var that = this;
      web
        .request({
          url: that.api.swap.deleteSwap,
          method: "post",
          data: {
            groupId: that.selected,
            contractIds: [that.rightClickRow.id],
          },
        })
        .then((res) => {
          if (res != null && res.data.code == 200) {
            this.getTableData();
          }
        });
    },
    //移动到
    onMove() {},
    //div的右键点击
    divRightClick(event) {
      this.divMenuVisible = false;
      this.divMenuVisible = true;
      var menu = document.querySelector("#div_contextmenu");
      event.preventDefault();
      //获取我们自定义的右键菜单

      // 根据事件对象中鼠标点击的位置，进行定位
      menu.style.left = event.clientX + "px";
      menu.style.top = event.clientY + "px";
      // 改变自定义菜单的隐藏与显示
      menu.style.display = "block";
    },
    // table的右键点击当前行事件
    rightClick(row, column, event) {
      this.menuVisible = false;
      this.menuVisible = true;
      var menu = document.querySelector("#contextmenu");
      event.preventDefault();
      //获取我们自定义的右键菜单

      // 根据事件对象中鼠标点击的位置，进行定位
      menu.style.left = event.clientX + "px";
      menu.style.top = event.clientY + "px";
      // 改变自定义菜单的隐藏与显示
      menu.style.display = "block";
      // 获取当前右键点击table下标
      this.rightClickRow = row;
      this.tableData.forEach((item, index) => {
        if (item.name === row.name) {
          this.currentRowIndex = index;
          return false;
        }
      });
    },

    foo() {
      // 取消鼠标监听事件 菜单栏
      this.menuVisible = false;
      this.divMenuVisible = false;
      document.removeEventListener("click", this.foo); // 关掉监听，
    },
    //拖拽
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
        },
      });
    },
  },
};
</script>

