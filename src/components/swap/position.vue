<style lang="less" scoped>
</style>

<template>
  <div class="fillcontain">
      <div class="title">
          <p>持仓</p>
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
                name: '1',
                time: '2',
                symbol: '3',
                type: '4',
                direction: '5',
                price: '6',
                amount: '7',
                turnover: '8',
                operate: '9',
            },
        ],
      },
    };
  },
  created() {},
};
</script>

