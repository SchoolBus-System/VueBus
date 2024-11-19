<template>
  <div>
    <el-row class="header">
      <el-col :span="6"
        ><el-button type="primary">1. 添加车辆和驾驶机</el-button></el-col
      >
      <el-col :span="6"
        ><el-button type="primary">2. 查看车辆定位</el-button></el-col
      >
      <el-col :span="6"
        ><el-button type="primary">3. 进行车辆管理</el-button></el-col
      >
      <el-col :span="6"
        ><el-button type="primary">4. 开启智能监控</el-button></el-col
      >
    </el-row>

    <div class="description">
      <p>
        使用商管中心，从添加车辆和驾驶机开始
        现在点击左边导航栏“基本信息”，建议添加一辆车和一位司机吧！
      </p>
      <el-button type="info">如何添加车辆</el-button>
      <el-button type="info">如何添加司机</el-button>
    </div>

    <el-row class="data-tables" gutter="20">
      <el-col :span="8">
        <div class="data-table">
          <h3>排载数据报表</h3>
          <div class="table-content"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="data-table">
          <h3>排载数据报表</h3>
          <div class="table-content"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="data-table">
          <h3>排载数据报表</h3>
          <div class="table-content"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.header {
  margin-bottom: 20px;
}

.description {
  margin-bottom: 20px;
}

.data-tables {
  margin-top: 20px;
}

.data-table {
  border: 1px solid #000080; /* 用于模拟数据表的边框 */
  padding: 10px;
  min-height: 200px; /* 设置中间内容的最小高度 */
  background-color: #f0f9ff; /* 背景色可以自由调整 */
}

.table-content {
  height: 150px; /* 可以根据需要调整 */
  background-color: #f9f9f9; /* 表格内容背景色 */
}
</style>
