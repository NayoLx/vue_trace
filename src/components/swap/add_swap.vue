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
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="add-swap-content">
      <div class="add-swap-content-title">
        <p>合约列表</p>
        <div class="line"></div>
      </div>
      <el-row>
        <div class="add-swap-content-list" v-for="item in searchList" :key="item.id">
          <el-col :span="6"
            ><div style="text-align: left">{{ item.code }}</div>
          </el-col>
          <el-col :span="6"
            ><div style="text-align: left">{{ item.name }}</div>
          </el-col>
          <el-col :span="6"
            ><div style="color: #4286f4">{{ item.type }}</div>
          </el-col>
          <el-col :span="6"
            ><div v-if="item.isAdd == true">已添加</div>
            <div v-else><i class="el-icon-circle-plus i-add" @click="add(item)"/></div>
          </el-col>
        </div>
      </el-row>
    </div>

    <div class="add-swap-content">
      <div class="add-swap-content-title">
        <p>本次添加</p>
        <div class="line"></div>
      </div>
      <el-row>
        <div class="add-swap-content-list" v-for="item in newAdd" :key="item.id">
          <el-col :span="6"
            ><div style="text-align: left">{{ item.code }}</div>
          </el-col>
          <el-col :span="6"
            ><div style="text-align: left">{{ item.name }}</div>
          </el-col>
          <el-col :span="6"
            ><div style="color: #4286f4">{{ item.type }}</div>
          </el-col>
          <el-col :span="6"
            ><div v-if="item.isAdd == true">已添加</div>
            <div v-else><i class="el-icon-circle-plus i-add" @click="add(item)"/></div>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
      ],
      searchKey: '',
      value: "",
      newAdd: [],
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
    add(value) {
      value.isAdd = true;
      this.newAdd.push(value);
    },
    search() {
      this.searchList = this.list.filter(item => item.name.indexOf(this.searchKey) >= 0);
    }
  },
  mounted() {
    this.searchList = this.list;
  },
};
</script>

<style lang="less" scoped>
.add-swap {
  text-align: center;
  height: auto;
  max-height: 400px;

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
      width: 100px;
    }
  }

  .add-swap-content {
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
}
</style>