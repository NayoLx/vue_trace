<style lang="less">
.main-position {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  background-color: #1c1d21;
  color: #ffffff;

  .title {
    position: relative;
    top: 0;
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

  .main-position-table {
    height: 300px;
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

  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: #797979;
  }
}
</style>

<template>
  <div class="main-position">
    <div class="title">
      <span>持仓</span>
    </div>
    <div class="main-position-table">
      <el-table
        :data="tableData"
        style="width: 100%; background-color: #1c1d21; color: #fff"
        :header-cell-style="cellStyle"
        :cell-style="rowStyle"
      >
        <el-table-column label="品种" prop="time" width="150">
        </el-table-column>
        <el-table-column label="净持仓" width="150">
          <el-table-column prop="symbol"></el-table-column>
          <el-table-column prop="symbol"></el-table-column>
        </el-table-column>
        <el-table-column label="今买" width="150">
          <el-table-column prop="type"></el-table-column>
          <el-table-column prop="type"></el-table-column>
        </el-table-column>
        <el-table-column label="今卖" width="150">
          <el-table-column prop="type"></el-table-column>
          <el-table-column prop="type"></el-table-column>
        </el-table-column>
        <el-table-column label="最后成交价" prop="direction" width="150">
        </el-table-column>
        <el-table-column label="盈亏" prop="price" width="150">
        </el-table-column>
        <el-table-column label="持仓盈亏" prop="amount" width="150">
        </el-table-column>
        <el-table-column label="平仓盈亏" prop="turnover" width="150">
        </el-table-column>
      </el-table>
    </div>

    <div class="main-position-button">
      <Button>Default</Button>
      <Button>Default</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      tableData: [
        {
          name: "1",
          time: "2",
          symbol: "3",
          type: "4",
          direction: "5",
          price: "6",
          amount: "7",
          turnover: "8",
          operate: "9",
        },
      ],
    };
  },
  created() {},
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1) {
        return { display: "none" };
      }
      return "background-color: #2d2d31; color: #fff; height: 20px";
    },

    rowStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #1c1d21";
    },
  },
};
</script>

