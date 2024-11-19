<template>
  <div class="announcement-page">
    <el-row class="header">
      <el-button type="primary" class="margin-right" @click="showTemplateList"
        >模板列表</el-button
      >
      <el-button type="success" @click="createTemplate">新建信息模板</el-button>
    </el-row>

    <!-- 新增模板 -->
    <el-form :model="templateForm" label-width="120px" class="form-container">
      <el-form-item label="短信模板名称">
        <el-input
          v-model="templateForm.name"
          placeholder="请输入模板名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="短信模板内容">
        <el-input
          type="textarea"
          v-model="templateForm.content"
          :rows="8"
          placeholder="请输入模板内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveTemplate" class="left-button"
          >保存</el-button
        >
        <el-button @click="deleteTemplate" class="right-button">删除</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveTemplate" class="submit-btn"
      >发布</el-button
    >
    <!-- 模板列表 -->
    <el-dialog title="模板列表" :visible.sync="dialogVisible" width="30%">
      <el-table :data="templateList" style="width: 100%">
        <el-table-column prop="name" label="模板名称"></el-table-column>
        <el-table-column prop="content" label="模板内容"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editTemplate(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button
              @click="deleteTemplate(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteTemplate">删除</el-button></span
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      templateForm: {
        name: "",
        content: "",
      },
      templateList: [
        // 这里可以初始化一些模板数据
      ],
      dialogVisible: false,
    };
  },
  methods: {
    showTemplateList() {
      this.dialogVisible = true;
    },
    createTemplate() {
      this.templateForm = { name: "", content: "" }; // 清空表单
    },
    saveTemplate() {
      // 保存模板的逻辑
      console.log("保存模板", this.templateForm);
    },
    deleteTemplate(template) {
      // 删除模板的逻辑
      console.log("删除模板", template);
    },
    editTemplate(template) {
      // 编辑模板的逻辑
      console.log("编辑模板", template);
    },
  },
};
</script>

<style scoped>
.announcement-page {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.margin-right {
  margin-right: 10px;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  background-color: #fff;
}

.left-button {
  float: left; /* 左浮动 */
}

.right-button {
  float: right; /* 右浮动 */
  margin-left: 10px; /* 与保存按钮保持一定距离 */
}

.submit-btn {
  width: 100px;
  display: block;
  margin: 10px auto; /* 水平居中 */
}

.dialog-footer {
  text-align: right;
}
</style>
