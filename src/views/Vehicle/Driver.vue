<template>
  <div>
    <!-- 头部 -->
    <div class="header-actions">
      <!-- 账号管理 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="全部司机" name="first"></el-tab-pane>
        <el-tab-pane label="待审批司机" name="second"></el-tab-pane>
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
        <el-button type="primary" @click="showAddModal">添加司机</el-button>
        <el-button type="primary">下载导入模板</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="info" icon="el-icon-delete">回收站</el-button>
      </div>
    </div>

    <!-- 添加司机模态框 -->
    <el-dialog
      class="custom-dialog"
      title="新增司机"
      width="800px"
      :visible.sync="addModalDriver"
    >
      <el-form @submit.native.prevent="addDriver" ref="form" :model="driver">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="司机姓名">
              <el-input
                v-model="driver.name"
                placeholder="请输入名字"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input
                v-model="driver.phone"
                placeholder="请输入号码"
                type="number"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="司机性别">
              <el-input
                v-model="driver.sex"
                placeholder="请输入性别"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号">
              <el-input
                v-model="driver.id_card"
                placeholder="请输入身份证号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家庭住址">
              <el-input
                v-model="driver.address"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="准驾车型">
              <el-input
                v-model="driver.driving_type"
                placeholder="请输入驾驶证类型"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="驾驶证期">
              <el-date-picker
                v-model="driver.end_date"
                placeholder="请选择日期"
                :value-format="'yyyy-MM-dd'"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="从业资格">
              <el-input
                v-model="driver.qualifications"
                placeholder="请输入资格证"
              ></el-input>
            </el-form-item> </el-col
          ><el-col :span="12">
            <el-form-item label="违法条款">
              <el-input
                v-model="driver.illegal_number"
                placeholder="请输入违法次数"
              ></el-input>
            </el-form-item> </el-col
          ><el-col :span="12">
            <el-form-item label="排班次数">
              <el-input
                v-model="driver.scheduling"
                placeholder="请输入数字"
                type="number"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addModalDriver = false">取 消</el-button>
        <el-button type="primary" @click="addDriver">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表格部分 -->
    <el-table :data="filteredDrivers">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="司机姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column
        prop="id_card"
        label="身份证号码"
        width="90"
      ></el-table-column>
      <el-table-column prop="address" label="家庭住址"></el-table-column>
      <el-table-column
        prop="driving_type"
        label="驾驶证准驾车型"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="end_date"
        label="驾驶证有效期"
        width="110"
      ></el-table-column>
      <el-table-column
        prop="qualifications"
        label="从业资格证"
        width="90"
      ></el-table-column>
      <el-table-column
        prop="illegal_number"
        label="交通记录违法条款"
        width="140"
      ></el-table-column>
      <el-table-column
        prop="scheduling"
        label="已排班次数"
        width="90"
      ></el-table-column>
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
  name: "DriverInfo",
  data() {
    return {
      addModalDriver: false, // 控制模态框可见性
      driver: {},
      drivers: [],
      searchQuery: "", // 用户输入的搜索查询
      selectedKind: "", // 用户选择的分类
      selectedCheck: "",
      activeName: "all",
    };
  },
  computed: {
    // 计算属性，根据 searchQuery 过滤 vehicles
    filteredDrivers() {
      if (!this.searchQuery && !this.selectedKind) {
        return this.drivers; // 如果没有搜索查询和分类选择，返回所有文章
      }
      const lowerQuery = this.searchQuery.toLowerCase();
      return this.drivers.filter((driver) => {
        return (
          !this.searchQuery || driver.kind.toLowerCase().includes(lowerQuery)
        );
      });
    },
  },
  methods: {
    // 点击添加打开车辆模态框
    showAddModal() {
      this.addModalDriver = true; // 默认开启
    },
    // 上传文章
    addDriver() {
      // 定义分类映射关系
      const kindMapping = {
        new: "新能源车辆",
        other: "其他",
      };
      const checkMapping = {
        yes: "是",
        no: "否",
      };
      // 将 vehicle.list 替换成对应的中文名称
      const selectedKind = this.driver.kind;
      this.driver.kind = kindMapping[selectedKind] || selectedKind; // 进行映射，如果没有匹配则保留原值
      const selectedCheck = this.driver.check;
      this.driver.check = checkMapping[selectedCheck] || selectedCheck; // 进行映射，如果没有匹配则保留原值

      // 发送 POST 请求到后端，保存文章
      this.$http.post("drivers", this.driver).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "文章发布成功", // 消息内容
          type: "success", // 消息类型
        });
        // 关闭模态框
        this.addModalDriver = false;
        this.fetch();
      });
    },
    fetch() {
      this.$http.get("drivers").then((res) => {
        this.drivers = res.data.map((driver) => {
          // 使用 moment.js 格式化日期字段
          driver.end_date = moment(driver.end_date).format("YYYY-MM-DD");
          return driver;
        });
      });
    },
    read() {},
    edit(id) {
      this.$router.push(`/drivers/${id}`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`drivers/${id}`).then(() => {
        this.$message({
          message: "删除成功",
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

<style>
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
</style>
