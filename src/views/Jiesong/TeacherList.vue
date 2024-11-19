<template>
  <div>
    <div class="word-actions">
      <!-- 搜索日志 -->
      <div class="search-section">
        <label for="license-plate">编号：</label>
        <input type="text" id="license-plate" class="search-input" />
        <label for="name">姓名：</label>
        <input type="text" id="name" class="search-input" />
      </div>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button type="primary" icon="el-icon-edit">添加</el-button>
    </div>
    <!-- 日志表格部分 -->
    <el-table :data="filteredWords">
      <el-table-column prop="phrase" label="序号"></el-table-column>
      <el-table-column prop="time" label="编号"></el-table-column>
      <el-table-column prop="time" label="姓名"></el-table-column>
      <el-table-column prop="time" label="电话"></el-table-column>
      <el-table-column prop="time" label="状态"></el-table-column>
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
    return {};
  },

  methods: {
    read() {},
    edit(id) {
      this.$router.push(`/words/${id}/edit`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`words/${id}`).then(() => {
        this.$message({
          message: "文章删除成功",
          type: "success",
        });
        this.fetch(); //删除之后，调用fetch()方法进行再次获取数据，即可实现刷新
      });
    },
  },
  // 获取真正的数据
  created() {
    this.fetch(); //调用fetch()方法进行获取数据
  },
};
</script>

<style>
.word-actions {
  display: flex;
  align-items: center;
  gap: 10px; /* 使用gap提供一致的间隔 */
  margin-bottom: 20px;
}

.search-section {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  flex-wrap: nowrap; /* 禁止内容换行 */
}

.search-section label {
  margin-right: 8px; /* 标签与输入框之间的间隔 */
  white-space: nowrap; /* 禁止标签内的内容换行 */
}

.search-input {
  margin-right: 16px; /* 输入框之间的间隔 */
  flex-grow: 1; /* 输入框占据剩余空间 */
  height: 30px;
}
</style>
