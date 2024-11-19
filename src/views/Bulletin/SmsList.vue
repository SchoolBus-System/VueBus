<template>
  <div>
    <!-- 头部 -->
    <div class="header-actions">
      <!-- 短信模板管理 -->
      <el-tabs type="card">
        <el-tab-pane label="司机" name="first"></el-tab-pane>
        <el-tab-pane label="跟车员" name="second"></el-tab-pane>
        <el-tab-pane label="乘客" name="third"></el-tab-pane>
      </el-tabs>
      <!-- 添加和搜索部分 -->
      <div class="word-actions">
        <!-- 搜索 -->
        <div class="search-section">
          <input
            type="text"
            id="name"
            class="search-input"
            placeholder="请输入搜索内容..."
          />
        </div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="showAddModal">添加短信模板</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
    </div>

    <!-- 模态框 -->
    <el-dialog
      class="custom-dialog"
      :visible.sync="addModalAccount"
      title="添加账号"
      width="450px"
    >
      <el-form @submit.native.prevent="addAccount" ref="form" :model="account">
        <el-form-item label="管理员姓名">
          <el-input
            v-model="account.admin_name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员账号">
          <el-input
            v-model="account.username"
            placeholder="请输入账号名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input
            type="password"
            v-model="account.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员权限">
          <el-select v-model="account.authority" placeholder="请选择权限">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="司机" value="driver"></el-option>
            <el-option label="用户" value="user"></el-option>
            <!-- 添加更多状态选项 -->
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAccount">添加</el-button>
        <el-button @click="addModalAccount = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 表格部分 -->
    <el-table :data="filteredAccounts">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="admin_name" label="短信模板名称"></el-table-column>
      <el-table-column prop="username" label="模板参考个数"></el-table-column>
      <el-table-column prop="authority" label="创建时间"></el-table-column>
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
import moment from "moment";
export default {
  name: "SmsList",
  data() {
    return {
      addModalAccount: false, // 控制模态框可见性
      account: {},
      accounts: [],
      searchQuery: "", // 用户输入的搜索查询
      selectedType: "", // 账户选择的分类
      activeName: "all",
    };
  },
  //   computed: {
  //     // 计算属性，根据 searchQuery 过滤
  //     filteredAccounts() {
  //       if (!this.searchQuery && !this.selectedType) {
  //         return this.accounts; // 如果没有搜索查询和分类选择，返回所有文章
  //       }
  //       const lowerQuery = this.searchQuery.toLowerCase();
  //       return this.accounts.filter((account) => {
  //         return (
  //           !this.searchQuery || account.type.toLowerCase().includes(lowerQuery)
  //         );
  //       });
  //     },
  //   },
  methods: {
    // 点击添加打开车辆模态框
    showAddModal() {
      this.addModalAccount = true; // 默认开启
    },
    // 上传文章
    addAccount() {
      // 定义分类映射关系
      const authorityMapping = {
        admin: "管理员",
        driver: "司机",
        user: "用户",
      };
      // 将 vehicle.list 替换成对应的中文名称
      const selectedAuthority = this.account.authority;
      this.account.authority =
        authorityMapping[selectedAuthority] || selectedAuthority; // 进行映射，如果没有匹配则保留原值

      // 发送 POST 请求到后端，保存文章account
      this.$http.post("accounts", this.account).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "账户添加成功", // 消息内容
          type: "success", // 消息类型
        });
        // 关闭模态框
        this.addModalAccount = false;
        this.fetch();
      });
    },
    fetch() {
      this.$http.get("accounts").then((res) => {
        this.accounts = res.data.map((account) => {
          // 使用 moment.js 格式化日期字段
          account.time = moment(account.time).format("YYYY-MM-DD");
          return account;
        });
      });
    },
    read() {},
    edit(id) {
      this.$router.push(`/accounts/${id}`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`accounts/${id}`).then(() => {
        this.$message({
          message: "账户删除成功",
          type: "success",
        });
        this.fetch(); //删除之后，调用fetch()方法进行再次获取数据，即可实现刷新
      });
    },
  },
  // 获取车辆数据
  created() {
    this.fetch();
  },
};
</script>

<!-- <style>
  .header-actions {
    display: flex;
    justify-content: space-between; /* 使左右两部分间隔均匀 */
    align-items: center; /* 垂直居中 */
  }
  
  .word-actions {
    display: flex;
    align-items: center;
  }
  
  .search-section {
    display: flex;
    align-items: center;
    font-size: 16px; /* 调整字体大小 */
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
  </style> -->
