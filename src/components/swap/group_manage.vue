<template>
  <div class="group-manage">
    <el-row>
      <el-col :span="9">
        <div class="group-manage-left">
          <div class="group-manage-left-title">
            <p>已有合约组</p>
            <el-button size="mini" class="btn" @click="onAdd()">新增</el-button>
          </div>
          <div>
            <div
              class="group-manage-left-list"
              v-for="item in group"
              :key="item.id"
              :class="{ active: selectGroupId === item.id }"
              @click="onChoose(item)"
            >
              <span>{{ item.name }} ({{ item.count }})</span>
              <div class="group-manage-left-list-icon">
                <i class="el-icon-edit-outline" @click="iEdit(item)" />
                <i class="el-icon-plus" @click="iAdd()" />
                <i class="el-icon-delete-solid" @click="iDelete(item)" />
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div style="margin-top: 30px; margin-left: 10px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="code" label="交易代码"> </el-table-column>
            <el-table-column prop="name" label="合约名称"> </el-table-column>
            <el-table-column label="移除">
              <template slot-scope="scope">
                <i
                  class="el-icon-remove-outline"
                  @click="handleEdit(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :title="title"
      :visible.sync="addVisible"
      width="20%"
      v-dialogDrag
      append-to-body
    >
      <template>
        <div>
          <p>请输入合约组的名称</p>
          <el-input
            type="text"
            size="mini"
            placeholder="请输入内容"
            v-model="new_name"
            maxlength="20"
            show-word-limit
          ></el-input>
          <div>
            <el-button type="primary" plain size="mini" @click="onSubmit()"
              >确定</el-button
            >
            <el-button size="mini">取消</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectGroupId: 0,
      title: "",
      new_name: "",
      group: [
        {
          name: "合约组1",
          count: 2,
          id: 0,
          swaps: [
            {
              id: 0,
              code: "00215",
              name: "1221",
            },
          ],
        },
        {
          name: "合约组2",
          count: 0,
          id: 1,
        },
      ],
      tableData: [],
      addVisible: false,
    };
  },
  methods: {
    onSubmit() {
        this.group.push({
            name: this.new_name,
            count: 0,
            id: this.group.length,
            swaps: [],
        });
        this.addVisible =false;
    },
    onAdd() {
      this.title = "新增";
      this.new_name = "";
      this.addVisible = true;
    },
    onChoose(value) {
      this.selectGroupId = value.id;
      this.tableData = value.swaps;
    },
    iEdit(value) {
      console.log("edit");
      this.title = "修改";
      this.new_name = value.name;
      this.addVisible = true;
    },
    iAdd() {
      console.log("add");
    },
    iDelete() {
      console.log("delete");
    },
    handleEdit(index, value) {
        console.log(index);
        console.log(value);
    }
  },
};
</script>

<style lang="less" scoped>
.group-manage {
  height: 400px;

  .group-manage-left {
    .group-manage-left-title {
      display: flex;
      margin-bottom: 8px;
      justify-content: space-between;

      .btn {
        line-height: 0px;
        height: 25px;
      }
    }

    .group-manage-left-list {
      display: flex;
      height: 30px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      &.active {
        background-color: cornflowerblue;
        color: #fff;
      }
    }

    .group-manage-left-list:hover {
      background-color: #4286f43b;
    }

    .group-manage-left-list-icon {
      i {
        margin: 0 2px;
      }
    }
  }
}
</style>