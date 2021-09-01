<template>
  <div class="add-swap">
    <div class="add-swap-header">
      <el-row>
        <el-col :span="8"
          ><el-input
            placeholder="请搜索"
            suffix-icon="el-icon-search"
            v-model="searchKey"
            @input="search()"
          >
          </el-input
        ></el-col>
        <el-col :span="16">
          <div class="add-swap-header-item">
            <p>交易所</p>
            <div>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.memo"
                  :label="item.memo"
                  :value="item.memo"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="add-swap-content">
      <div style="width: 44%">
        <div class="add-swap-content-title">
          <p>合约列表</p>
          <div class="line"></div>
        </div>
        <el-table
          ref="addMultipleTable"
          :data="list"
          height="300"
          :header-cell-style="cellStyle"
          :cell-style="rowStyle"
          @selection-change="add"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column label="交易代码" prop="code"> </el-table-column>
          <el-table-column prop="name" label="合约名称"> </el-table-column>
        </el-table>
      </div>

      <div class="add-swap-content-btn-list">
        <div
          class="add-swap-content-btn"
          :class="{ active: this.addList.length > 0 }"
          @click="setAdd()"
        >
          添加
        </div>
        <div
          class="add-swap-content-btn"
          :class="{ active: this.deleteList.length > 0 }"
          @click="setDelete()"
        >
          删除
        </div>
      </div>

      <div style="width: 44%">
        <div class="add-swap-content-title">
          <p>本次添加</p>
          <div class="line"></div>
        </div>
        <el-table
          ref="deleteMultipleTable"
          :data="newAdd"
          height="300"
          :header-cell-style="cellStyle"
          :cell-style="rowStyle"
          @selection-change="deleteItem"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column label="日期" prop="code"> </el-table-column>
          <el-table-column prop="name" label="合约名称"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="add-swap-btn">
      <el-button type="primary" plain size="mini" @click="onSubmit()"
        >确定</el-button
      >
      <el-button size="mini">取消</el-button>
    </div>
  </div>
</template>

<script>
import web from "@/config/web";

export default {
  props: ["groundId"],
  data() {
    return {
      options: [],
      searchKey: "",
      value: "",
      newAdd: [],
      addList: [],
      deleteList: [],
      searchList: [],
      list: [
        {
          name: "沪镍",
          id: 0,
          code: "ni9999",
          type: "期货",
          isAdd: false,
        },
        {
          name: "橡胶",
          id: 1,
          code: "ni9999",
          type: "期货",
          isAdd: false,
        },
        {
          name: "沪铝",
          id: 2,
          code: "ni9999",
          type: "期货",
          isAdd: true,
        },
      ],
    };
  },
  methods: {
    init() {
      this.getOptions();
    },
    getOptions() {
      let exchange = this.$session.get("exchange");
      console.log(this.groundId);
      this.options = exchange;
      this.value = this.options[0].memo;
    },
    getSwapList() {
      web
        .request({
          url: "/fospot/counter/api/quotation/contract",
          method: "post",
          data: {
            exchangeId: this.value.exchangeId,
            searchKey: this.searchKey,
          },
        })
        .then((res) => {
          if (res != null && res.data != null) {
            console.log(res.data);
            this.options = res.data.data;
          }
        });
    },
    setAdd() {
      var that = this;
      that.addList.forEach(function (value, index, arr) {
        if (that.newAdd.includes(value) == false) {
          that.newAdd.push(value);
        }
      });
      that.addList = [];
      this.$refs.addMultipleTable.clearSelection();
    },
    setDelete() {
      var that = this;
      that.deleteList.forEach(function (value, index, arr) {
        if (that.newAdd.includes(value) == true) {
          let index = that.newAdd.indexOf(value);
          that.newAdd.remove(index);
        }
      });
      this.$refs.deleteMultipleTable.clearSelection();
    },
    deleteItem(value) {
      this.deleteList = value;
    },
    add(value) {
      this.addList = value;
    },

    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #2d2d31; color: #fff; height: 20px";
    },
    rowStyle({ row, column, rowIndex, columnIndex }) {
      return "background-color: #1c1d21";
    },
    search() {
      this.searchList = this.list.filter(
        (item) => item.name.indexOf(this.searchKey) >= 0
      );
    },
  },
  created() {
    this.init();
  },
  mounted() {
    this.searchList = this.list;
  },
};
</script>

<style lang="less">
.add-swap {
  text-align: center;
  height: auto;
  max-height: 500px;
  background-color: #2d2d31;

  .add-swap-header {
    display: flex;
    justify-content: space-between;
  }

  .add-swap-header-item {
    display: flex;
    align-items: center;
    margin-left: 40px;

    p {
      text-align: center;
      width: 50px;
      color: #ffffffcb;
    }
  }

  .add-swap-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    .add-swap-content-list {
      display: flex;
      height: 30px;
      align-items: center;
    }
    .add-swap-content-list:hover {
      background-color: #4286f43b;
    }
    .i-add:hover {
      color: #4286f4;
    }
  }

  .add-swap-content-title {
    p {
      text-align: left;
      color: #ffffffcb;
      margin-bottom: 10px;
    }
  }

  .add-swap-btn {
    text-align: right;
  }

  .el-table th > .cell {
    padding-left: 14px;
    padding-right: 14px;
  }

  .el-input--suffix .el-input__inner {
    background-color: #1c1d21;
    color: #fff !important;
    height: 30px;
    border: 1px solid #797979 !important;
  }

  .el-input-number.is-controls-right .el-input__inner {
    background-color: #1c1d21;
    color: #fff !important;
    height: 30px;
    border: 1px solid #797979 !important;
  }

  .el-input-number__decrease,
  .el-input-number__increase {
    border: none;
  }

  .el-input-number.is-controls-right .el-input-number__decrease,
  .el-input-number.is-controls-right .el-input-number__increase {
    line-height: 15px;
  }

  .el-input-number {
    line-height: 30px;
  }

  .el-input-number.is-controls-right .el-input-number__decrease {
    background-color: #1c1d21;
    color: #fff !important;
    border: none;
  }

  .el-input-number.is-controls-right .el-input-number__increase {
    background-color: #1c1d21;
    color: #fff !important;
    border: none;
  }

  .el-input__icon {
    width: 25px;
    line-height: 30px;
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

  .el-table .cell {
    color: #ffffffcb;
  }

  .el-table::before {
    background-color: #1c1d21;
  }

  .el-table__body-wrapper {
    background-color: #1c1d21;
  }

  .add-swap-content-btn {
    width: auto;
    padding: 2px 10px;
    margin: 30px 5px;
    font-size: 12px;
    cursor: pointer;
    color: #ffffffcb;
    border: 1px solid #ffffffcb;
  }

  .add-swap-content-btn.active {
    color: #ffffff;
    background-color: #174b94c9;
    border: 1px solid #174b94;
  }
}
</style>