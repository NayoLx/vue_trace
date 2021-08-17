<style lang="less" scoped>
</style>

<template>
  <div>
    <div class="title">
      <p>成交记录</p>
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

