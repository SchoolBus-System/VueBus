<template>
  <div>
    <div class="word-actions">
      <!-- 搜索 -->
      <div class="search-section">
        <label for="license-plate">车牌号码：</label>
        <input type="text" id="license-plate" class="search-input" />
        <label for="name">姓名：</label>
        <input type="text" id="name" class="search-input" />
      </div>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="showAddModal"
        >添加</el-button
      >
      <!-- 模态框 -->
      <el-dialog
        class="custom-dialog"
        :visible.sync="addModalVisible"
        title="新增车辆"
        width="450px"
      >
        <el-form>
          <el-form-item label="司机姓名">
            <el-input
              v-model="newVehicle.name"
              placeholder="请输入司姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input
              v-model="newVehicle.phone"
              placeholder="请输入号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="车牌号码">
            <el-input
              v-model="newVehicle.licensePlate"
              placeholder="请输入车牌号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="车辆状态">
            <el-select v-model="newVehicle.status" placeholder="请选择状态">
              <el-option label="正常" value="status1"></el-option>
              <el-option label="待定" value="status2"></el-option>
              <!-- 添加更多状态选项 -->
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addVehicle">车辆添加</el-button>
          <el-button @click="addModalVisible = false">取消</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 表格部分 -->
    <el-table :data="filteredWords">
      <el-table-column prop="phrase" label="序号" width="150"></el-table-column>
      <el-table-column
        prop="licensePlate"
        label="车牌号码"
        width="220"
      ></el-table-column>
      <el-table-column prop="name" label="姓名" width="220"></el-table-column>
      <el-table-column prop="phone" label="电话" width="220"></el-table-column>
      <el-table-column prop="status" label="状态" width="220"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="read(scope.row._id)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="edit(scope.row._id)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="remove(scope.row._id)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addModalVisible: false,
      newVehicle: {
        name: "",
        phone: "",
        licensePlate: "",
        status: "",
      },
    };
  },

  methods: {
    showAddModal() {
      this.addModalVisible = true;
    },
    addVehicle() {
      console.log(this.newVehicle);
      this.addModalVisible = false;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
.word-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-section {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.search-section label {
  margin-right: 8px;
  white-space: nowrap;
}

.search-input {
  margin-right: 16px;
  flex-grow: 1;
  height: 32px; /* Slightly increase height for better usability */
  padding: 0 10px; /* Add padding for better spacing */
}

.custom-dialog .el-dialog {
  border-radius: 8px; /* Add rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Add soft shadow */
}

.custom-dialog .el-form-item {
  margin-bottom: 20px; /* Increase spacing between form items */
}

.custom-dialog .dialog-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.el-button {
  border-radius: 4px;
}

.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--primary:hover {
  background-color: #66b1ff;
}

.el-input {
  border-radius: 4px; /* Consistent input rounding */
  border: 1px solid #dcdfe6; /* Add border */
}

.el-input:hover {
  border-color: #409eff; /* Input border color on hover */
}
</style>
