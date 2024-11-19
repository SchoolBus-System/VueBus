<template>
  <div>
    <div class="word-actions">
      <el-button type="primary" icon="el-icon-edit" @click="goToAddPage"
        >添加公告</el-button
      >
      <!-- 搜索 -->
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <!-- 表格部分 -->
    <el-table :data="filteredWords">
      <el-table-column prop="phrase" label="开始日期"></el-table-column>
      <el-table-column prop="time" label="结束日期"></el-table-column>
      <el-table-column prop="time" label="公告内容"></el-table-column>
      <el-table-column prop="time" label="URL"></el-table-column>
      <el-table-column prop="time" label="接受人"></el-table-column>
      <el-table-column prop="time" label="创建时间"></el-table-column>
      <el-table-column prop="time" label="修改时间"></el-table-column>
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
      value1: "",
      value2: "",
    };
  },

  methods: {
    goToAddPage() {
      this.$router.push("/bulletin/add"); // 替换为你要跳转的页面路径
    },
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
