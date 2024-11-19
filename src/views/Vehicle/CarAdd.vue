<template>
  <div class="container">
    <el-form
      @submit.native.prevent="saveLink"
      ref="form"
      :model="link"
      label-width="120px"
    >
      <el-form-item label="姓名">
        <el-input v-model="link.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="link.content"></el-input>
      </el-form-item>
      <el-form-item label="车牌号码">
        <el-input v-model="link.site"></el-input>
      </el-form-item>
      <el-form-item label="车辆状态">
        <el-select v-model="link.type" placeholder="请选择状态">
          <el-option label="工作" value="program"></el-option>
          <el-option label="空闲" value="learn"></el-option>
        </el-select>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" native-type="submit">车辆添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文章
      link: {},
    };
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ""}`,
      };
    },
    // 图片url赋值为
    afterUpload(res) {
      // this.user赋值主体    'image'赋值的属性
      this.$set(this.link, "ico", res.url);
    },
    // 上传文章
    saveLink() {
      // 定义分类映射关系
      const categoryMapping = {
        learn: "学习工具",
        program: "编程工具",
      };

      // 将 link.list 替换成对应的中文名称
      const selectedCategory = this.link.state;
      this.link.state = categoryMapping[selectedCategory] || selectedCategory; // 进行映射，如果没有匹配则保留原值

      const selectedType = this.link.type;
      this.link.type = categoryMapping[selectedType] || selectedType; // 进行映射，如果没有匹配则保留原值

      // 发送 POST 请求到后端，保存网站
      this.$http.post("links", this.link).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "添加成功", // 消息内容
          type: "success", // 消息类型
        });
        // 跳转到网站详情页面
        this.$router.push("/links/index");
      });
    },
    // 取消上传
    cancel() {
      this.$router.push("/links/index");
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form-item .el-input {
  width: 300px;
}
</style>
