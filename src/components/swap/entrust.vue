<style lang="less">
.main-entrust {
  background-color: #1c1d21;
  color: #ffffff;

  .el-table td,
  .el-table th {
    padding: 5px 0;
  }

  .title {
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

  .main-entrust-btn {
    .main-entrust-btn-item {
      width: 60px;
      height: 25px;
    }

    .el-button {
      background-color: #ffffff1a;
      color: #ffffff;
      border: 1px solid #797979;
    }

    .el-button--mini,
    .el-button--mini.is-round {
      padding: 4px 15px;
      margin: 10px 5px;
    }
  }
}
</style>

<template>
  <div class="main-entrust">
    <div class="title">
      <span>委托</span>
    </div>

    <div class="main-entrust-btn">
      <el-button size="mini" style="main-entrust-btn-item">撤单</el-button>
      <el-button size="mini" style="main-entrust-btn-item">全撤</el-button>
    </div>

    <div style="overflow-y: scroll; overflow-x: hidden; height: 300px">
      <el-table
        :data="tableData"
        style="width: 100%; background-color: #1c1d21; color: #fff"
        :header-cell-style="cellStyle"
        :cell-style="rowStyle"
      >
        <el-table-column label="报单编号" prop="time" width="150">
        </el-table-column>
        <el-table-column label="合约" prop="symbol" width="150">
        </el-table-column>
        <el-table-column label="买卖" prop="type" width="150">
        </el-table-column>
        <el-table-column label="开平" prop="direction" width="150">
        </el-table-column>
        <el-table-column label="报单手数" prop="price" width="150">
        </el-table-column>
        <el-table-column label="报单价格" prop="amount" width="150">
        </el-table-column>
        <el-table-column label="未成交手数" prop="turnover" width="150">
        </el-table-column>
        <el-table-column label="卖量成交手数" prop="tradedAmount" width="150">
        </el-table-column>
        <el-table-column label="详细状态" prop="operate"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      subscription: {
        topic: "topic/test2",
        qos: 0,
      },
      receiveNews: "",
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
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.user);
      this.doSubscribe();
    },

    doSubscribe() {
      const { topic, qos } = this.subscription;
      if (this.$client == null) {
        this.$router.push("/");
        return;
      }
      this.$client.subscribe(topic, qos, (error, res) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        this.subscribeSuccess = true;
        console.log("Subscribe to topics res", res);
      });
      this.$client.on("message", (messageTopic, message) => {
        if (messageTopic == topic) {
          const y = JSON.parse(message);
          this.tableData.unshift(y);
        }
        console.log(`Received message ${message} from topic ${messageTopic}`);
      });
    },

    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #2d2d31; color: #fff; height: 20px";
    },

    rowStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #1c1d21";
    },
  },
};
</script>

