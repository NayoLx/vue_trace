<style lang="less">
.main-position-h {
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
  <div class="main-position-h">
    <div class="title">
      <span>成交记录</span>
    </div>
    <Table
      height:240
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
            title: "Name",
            key: "name",
            width: 150,
          },
          {
            title: self.$t("exchange.time"),
            width: 150,
            key: "time",
          },
          {
            title: self.$t("exchange.symbol"),
            width: 150,
            key: "symbol",
          },
          {
            title: self.$t("exchange.type"),
            width: 150,
          },
          {
            title: self.$t("exchange.direction"),
            width: 150,
            key: "direction",
          },
          {
            title: self.$t("exchange.price"),
            width: 150,
            key: "price",
          },
          {
            title: self.$t("exchange.num"),
            width: 150,
            key: "amount",
          },
          {
            title: self.$t("exchange.traded"),
            width: 150,
            key: "tradedAmount",
          },
          {
            title: self.$t("exchange.dealamount"),
            width: 150,
            key: "turnover",
          },
          {
            title: self.$t("exchange.action"),
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

