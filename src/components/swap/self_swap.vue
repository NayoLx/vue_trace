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
    <div class="swap_group">
      <vuedraggable v-model="swapGroup" :v-bind="updated()">
        <transition-group style="display:flex">
          <div
            class="swap_group_item"
            v-for="item in swapGroup"
            v-bind:key="item.groupId"
            @click="changeGroup(item.groupId)"
            :class="{ active: selected === item.groupId }"
          >
            {{ item.groupName }}
          </div>
        </transition-group>
      </vuedraggable>
    </div>
    <div class="self-swap-table">
      <el-table
        row-key="id"
        :data="tableData"
        @row-contextmenu="rightClick"
        style="width: 100%; color: #fff"
        :header-cell-style="cellStyle"
        :cell-style="rowStyle"
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
        <el-table-column label="合约" prop="time" width="150">
        </el-table-column>
        <el-table-column label="合约名" prop="symbol" width="150">
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

    <el-dialog
      title="添加自选合约"
      :visible.sync="dialogVisible"
      width="60%"
      v-dialogDrag
    >
      <AddSwap :groundId="selected"></AddSwap>
    </el-dialog>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import Sortable from "sortablejs";
import AddSwap from "./add_swap.vue";
import web from "@/config/web";

export default {
  props: ["user"],
  components: {
    AddSwap,
    vuedraggable,
  },
  data() {
    return {
      canSort: true,
      cascaderValue: "",
      options: [
        {
          value: "order",
          label: "下单",
        },
        {
          value: "move",
          label: "移动到",
          children: [
            {
              value: "yizhi",
              label: "一致",
            },
            {
              value: "fankui",
              label: "反馈",
            },
            {
              value: "xiaolv",
              label: "效率",
            },
            {
              value: "kekong",
              label: "可控",
            },
          ],
        },
        {
          value: "add",
          label: "设置合约",
        },
        {
          value: "delete",
          label: "删除",
        },
      ],
      dialogVisible: false,
      menuVisible: false,
      selected: "",
      tableData: [],
      swapGroup: [],
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    updated() {
      console.log(this.swapGroup);
    },
    setSort() {
      console.log("setSort");
      this.canSort = !this.canSort;
    },
    init() {
      this.getGroup();
    },
    getGroup() {
      web
        .request({
          url: "/fospot/counter/api/quotation/init/view",
          method: "get",
        })
        .then((res) => {
          if (res != null && res.data != null) {
            this.swapGroup = res.data.data;
            if (this.swapGroup.length > 0) {
              this.selected = this.swapGroup[0].groupId;
              this.getTableData();
            }
          }
        });
    },
    getTableData() {
      web
        .request({
          url: "/fospot/counter/api/quotation/view_group",
          method: "post",
          data: {
            groupId: this.selected,
          },
        })
        .then((res) => {
          if (res != null && res.data != null) {
            console.log(res);
            this.tableData = res.data.data;
          }
        });
    },
    changeGroup(val) {
      this.selected = val;
      this.getTableData();
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #2d2d31; color: #fff; height: 20px";
    },
    rowStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #1c1d21";
    },
    addSwap() {
      console.log("addswap");
      this.dialogVisible = true;
    },
    onChange(value) {
      console.log(value);
      this.cascaderValue = [];
    },
    // table的右键点击当前行事件
    rightClick(row, column, event) {
      this.menuVisible = false;
      this.menuVisible = true;
      var menu = document.querySelector(".menu");
      event.preventDefault();
      //获取我们自定义的右键菜单

      // 根据事件对象中鼠标点击的位置，进行定位
      menu.style.left = event.clientX + "px";
      menu.style.top = event.clientY + "px";
      // 改变自定义菜单的隐藏与显示
      menu.style.display = "block";
      // 获取当前右键点击table下标
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
      document.removeEventListener("click", this.foo); // 关掉监听，
    },
    rowDrop() {
      if (this.canSort == true) {
        const tbody = document.querySelector(".el-table__body-wrapper tbody");
        const _this = this;
        Sortable.create(tbody, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0];
            _this.tableData.splice(newIndex, 0, currRow);
          },
        });
      }
    },
  },
};
</script>

