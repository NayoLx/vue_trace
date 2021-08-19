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
}
</style>

<template>
  <div class="self_swap">
    <div class="swap_group">
      <div
        class="swap_group_item"
        v-for="item in swapGroup"
        v-bind:key="item.id"
        @click="changeGroup(item.id)"
        :class="{ active: selected === item.id }"
      >
        {{ item.title }}
      </div>
    </div>
    <el-table
      max-height="300"
      height="300"
      row-key="id"
      :data="tableData"
      style="width: 100%; color: #fff"
      :header-cell-style="cellStyle"
      :cell-style="rowStyle"
    >
      <el-table-column width="50" align="center">
        <template slot="header">
          <el-dropdown trigger="click" style="color: #fff">
            <i class="el-icon-s-tools"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加合约</el-dropdown-item>
              <el-dropdown-item>标记排序</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.$index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合约" prop="time" width="150"> </el-table-column>
      <el-table-column label="合约名" prop="symbol" width="150">
      </el-table-column>
      <el-table-column label="最新价" prop="type" width="150">
      </el-table-column>
      <el-table-column label="涨跌" prop="direction" width="150">
      </el-table-column>
      <el-table-column label="买价" prop="price" width="150"> </el-table-column>
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
</template>

<script>
import Sortable from "sortablejs";

export default {
  props: ['user'],
  data() {
    return {
      selected: "1",
      tableData: [
        {
          id: "1",
          time: "1",
          symbol: "1",
          type: "1",
          direction: "1",
          price: "1",
          amount: "1",
          turnover: "1",
          tradedAmount: "1",
          operate: "1",
        },
        {
          id: "2",
          time: "2",
          symbol: "2",
          type: "2",
          direction: "2",
          price: "2",
          amount: "2",
          tradedAmount: "2",
          turnover: "2",
          operate: "2",
        },
        {
          id: "3",
          time: "3",
          symbol: "3",
          type: "3",
          direction: "3",
          price: "3",
          amount: "3",
          tradedAmount: "3",
          turnover: "3",
          operate: "3",
        },
        {
          id: "4",
          time: "4",
          symbol: "4",
          type: "4",
          direction: "4",
          price: "4",
          amount: "4",
          tradedAmount: "4",
          turnover: "4",
          operate: "4",
        },
        {
          id: "5",
          time: "5",
          symbol: "5",
          type: "5",
          direction: "5",
          price: "5",
          amount: "5",
          tradedAmount: "5",
          turnover: "5",
          operate: "5",
        },
        {
          id: "6",
          time: "6",
          symbol: "6",
          type: "6",
          direction: "6",
          price: "6",
          amount: "6",
          tradedAmount: "6",
          turnover: "6",
          operate: "6",
        },
        {
          id: "7",
          time: "7",
          symbol: "7",
          type: "7",
          direction: "7",
          price: "7",
          amount: "7",
          tradedAmount: "7",
          turnover: "7",
          operate: "7",
        },
        {
          id: "8",
          time: "8",
          symbol: "8",
          type: "8",
          direction: "8",
          price: "8",
          amount: "8",
          tradedAmount: "8",
          turnover: "8",
          operate: "8",
        },
        {
          id: "9",
          time: "9",
          symbol: "9",
          type: "9",
          direction: "9",
          price: "9",
          amount: "9",
          tradedAmount: "9",
          turnover: "9",
          operate: "9",
        },
      ],
      swapGroup: [
        {
          id: "1",
          title: "合约组1",
        },
        {
          id: "2",
          title: "合约组2",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    init() {
      console.log(this.user);
    },
    changeGroup(val) {
      this.selected = val;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #2d2d31; color: #fff; height: 20px";
    },
    rowStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #1c1d21";
    },
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

