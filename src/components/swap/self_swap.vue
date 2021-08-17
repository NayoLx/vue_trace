<style lang="less">
.self_swap {
  width: 100%;
  color: #fff;
  background-color: #2d2d31;

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
  }

  .ivu-table:before {
    background-color: #2d2d31;
  }
  .ivu-table:after {
    background-color: #2d2d31;
  }

  .self_swap {
  }

  .swap_group {
    display: flex;

    .swap_group_item {
      width: auto;
      padding: 2px 5px;
      margin: 10px 5px;
      font-size: 12px;
      border: 1px solid #797979;

      .active {
        color: #ffffff;
        background-color: #525b68;
      }
    }
  }
}
</style>

<template>
  <div class="self_swap">
    <div class="swap_group">
      <div
        v-for="item in swapGroup"
        v-bind:key="item.id"
        :class="{ active: selected === item.id }"
        class="swap_group_item"
      >
        {{ item.title }}
      </div>
    </div>
    <Table
      height="300"
      border
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
      selected: 1,
      tableH: 0,
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
      currentOrder: {
        columns: [
          {
            title: " ",
            key: "id",
            width: 50,
            render: (h, params) => {
              if (params.row.id == " " || params.row.id == null) {
                return h("Icon", {
                  props: {
                    type: "ios-add",
                  },
                });
              } else {
                return h("span", {}, params.row.id);
              }
            },
            renderHeader: (h, params) => {
              return h("Icon", {
                props: {
                  type: "md-settings",
                },
              });
            },
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
            key: "type",
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
        rows: [
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            turnover: "8",
            tradedAmount: "10",
            operate: "9",
          },
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            tradedAmount: "10",
            turnover: "8",
            operate: "9",
          },
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            tradedAmount: "10",
            turnover: "8",
            operate: "9",
          },
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            tradedAmount: "10",
            turnover: "8",
            operate: "9",
          },
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            tradedAmount: "10",
            turnover: "8",
            operate: "9",
          },
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            tradedAmount: "10",
            turnover: "8",
            operate: "9",
          },
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            tradedAmount: "10",
            turnover: "8",
            operate: "9",
          },
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            tradedAmount: "10",
            turnover: "8",
            operate: "9",
          },
          {
            id: "1",
            time: "2",
            symbol: "3",
            type: "4",
            direction: "5",
            price: "6",
            amount: "7",
            tradedAmount: "10",
            turnover: "8",
            operate: "9",
          },
          {
            id: " ",
            time: " ",
            symbol: " ",
            type: " ",
            direction: " ",
            price: " ",
            amount: " ",
            tradedAmount: " ",
            turnover: " ",
            operate: " ",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    addSwap() {},
    sort() {},
  },
};
</script>

