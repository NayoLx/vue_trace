<style lang="less" scoped>
</style>

<template>
  <div>
    <Table
      height="300"
      :columns="historyOrder.columns"
      :no-data-text="$t('common.nodata')"
      :data="historyOrder.rows"
    ></Table>
  </div>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      historyOrder: {
        pageSize: 10,
        total: 10,
        page: 0,
        columns: [
          {
            type: "index",
            width: 40,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  skin: params.row.skin,
                  rows: params.row.detail,
                },
              });
            },
          },
          {
            title: self.$t("exchange.time"),
            key: "time",
            render: (h, params) => {
              return h("span", {}, this.dateFormat(params.row.time));
            },
          },
          {
            title: self.$t("exchange.symbol"),
            key: "symbol",
          },
          {
            title: self.$t("exchange.type"),
            render(h, params) {
              return h(
                "span",
                params.row.type === "LIMIT_PRICE"
                  ? self.$t("exchange.limited_price")
                  : self.$t("exchange.market_price")
              );
            },
          },
          {
            title: self.$t("exchange.direction"),
            key: "direction",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction.toLowerCase();
              return h(
                "span",
                {
                  attrs: {
                    class: className,
                  },
                },
                row.direction == "BUY"
                  ? self.$t("exchange.buyin")
                  : self.$t("exchange.sellout")
              );
            },
          },
          {
            title: self.$t("exchange.price"),
            key: "price",
            render(h, params) {
              return h("span", self.toFloor(params.row.price));
            },
          },
          {
            title: self.$t("exchange.num"),
            key: "amount",
            render(h, params) {
              return h("span", self.toFloor(params.row.amount));
            },
          },
          {
            title: self.$t("exchange.done"),
            key: "tradedAmount",
            render(h, params) {
              return h("span", self.toFloor(params.row.tradedAmount));
            },
          },
          {
            title: self.$t("exchange.dealamount"),
            key: "turnover",
            render(h, params) {
              return h("span", self.toFloor(params.row.turnover));
            },
          },
          {
            title: self.$t("exchange.status"),
            key: "status",
            render: (h, params) => {
              const status = params.row.status;
              if (status == "COMPLETED") {
                return h(
                  "span",
                  {
                    style: {
                      color: "#f0a70a",
                    },
                  },
                  self.$t("exchange.finished")
                );
              } else if (status == "CANCELED") {
                return h(
                  "span",
                  {
                    style: {
                      color: "#7c7f82",
                    },
                  },
                  self.$t("exchange.canceled")
                );
              } else {
                return h("span", {}, "--");
              }
            },
          },
        ],
        rows: [],
      },
    };
  },
  created() {},
};
</script>

