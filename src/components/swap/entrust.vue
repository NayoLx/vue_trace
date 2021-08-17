<style lang="less">
.main-entrust {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  background-color: #1c1d21;
  color: #ffffff;

  .ivu-form-label-top .ivu-form-item-label {
    color: #ffffff;
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #323337;
    border-bottom: 1px solid #797979;
    font-size: 11px;

    span {
      padding: 4px 10px;
      color: #ffffff;
      background-color: #525b68;
    }
  }

  .ivu-table {
    background-color: #2d2d31;
  }

  .ivu-table td {
    background-color: #1c1d21; //背景色
    height: 39px;
    color: #fff; //字体色
  }

  .ivu-table-row-hover td {
    background-color: #283d45 !important;
  }

  .ivu-table-wrapper .ivu-table .ivu-table-header th {
    color: #ffffffb7;
    background-color: #2d2d31; //背景色
    height: 24px;
    line-height: 15px;
  }

  .ivu-table-border td,
  .ivu-table-border th {
    border: 1px solid #797979;
  }

  .ivu-table-wrapper-with-border {
    border: none;
  }

  .ivu-table:before {
    background-color: #2d2d31;
  }
  .ivu-table:after {
    background-color: #2d2d31;
  }
}
</style>

<template>
  <div class="main-entrust">
    <div class="title">
      <span>委托</span>
    </div>
    <Table
      height="240"
      :columns="currentOrder.columns"
      :data="currentOrder.rows"
      :no-data-text="$t('common.nodata')"
    ></Table>
  </div>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      currentOrder: {
        columns: [
          {
            title: "报单编号",
            key: "name",
            width: 150,
          },
          {
            title: "合约",
            width: 150,
            key: "time",
          },
          {
            title: "买卖",
            width: 150,
            key: "symbol",
          },
          {
            title: "开平",
            width: 150,
          },
          {
            title: "报单手数",
            width: 150,
            key: "direction",
          },
          {
            title: "报单价格",
            width: 150,
            key: "price",
          },
          {
            title: "未成交手数",
            width: 150,
            key: "amount",
          },
          {
            title: "卖量成交手数",
            width: 150,
            key: "tradedAmount",
          },
          {
            title: "详细状态",
            width: 150,
            key: "turnover",
          },
          {
            title: "合约",
            key: "operate",
            width: 110,
          },
        ],
        rows: [],
      },
    };
  },
  created() {},
};
</script>

