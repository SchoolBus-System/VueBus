<template>
  <div>
    <!-- 头部 -->
    <div class="header-actions">
      <!-- 标签 -->
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="全部车辆" value="all"></el-tab-pane>
        <el-tab-pane label="新能源车辆" value="new"></el-tab-pane>
      </el-tabs>
      <!-- 添加和搜索部分 -->
      <div class="word-actions">
        <!-- 搜索 -->
        <div class="search-section">
          <input
            type="text"
            class="search-input"
            placeholder="请输入搜索内容..."
            v-model="searchQuery"
          />
        </div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="showAddModal">添加车辆</el-button>
        <el-button type="primary">下载导入模板</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="info" icon="el-icon-delete">回收站</el-button>
      </div>
    </div>

    <!-- 添加车辆模态框 -->
    <el-dialog
      class="custom-dialog"
      title="添加车辆"
      width="800px"
      :visible.sync="addModalVisible"
    >
      <el-form @submit.native.prevent="addVehicle" ref="form" :model="vehicle">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车牌号码">
              <el-input
                v-model="vehicle.license_plate"
                placeholder="请输入车牌号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="座位数目">
              <el-input
                v-model="vehicle.seat_number"
                placeholder="请输入座位数"
                type="number"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车辆型号">
              <el-input
                v-model="vehicle.type"
                placeholder="请输入型号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车架号数">
              <el-input
                v-model="vehicle.frame_number"
                placeholder="请输入车架号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发动机号">
              <el-input
                v-model="vehicle.engine_number"
                placeholder="请输入发动机号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已排班次">
              <el-input
                v-model="vehicle.scheduling"
                placeholder="请输入数字"
                type="number"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="车辆类型">
              <el-select v-model="vehicle.kind" placeholder="请选择">
                <el-option label="新能源车辆" value="new"></el-option>
                <el-option label="其他" value="other"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否年检">
              <el-select v-model="vehicle.check" placeholder="请选择">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维护日期">
              <el-date-picker
                v-model="vehicle.repair_date"
                type="date"
                placeholder="选择日期"
                :value-format="'yyyy-MM-dd'"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="购置日期">
              <el-date-picker
                v-model="vehicle.buy_date"
                type="date"
                placeholder="选择日期"
                :value-format="'yyyy-MM-dd'"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVehicle">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表格部分 -->
    <el-table :data="filteredVehicles">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="license_plate" label="车牌号码"></el-table-column>
      <el-table-column prop="seat_number" label="座位数"></el-table-column>
      <el-table-column prop="type" label="型号"></el-table-column>
      <el-table-column prop="frame_number" label="车架号"></el-table-column>
      <el-table-column prop="engine_number" label="发动机号"></el-table-column>
      <el-table-column
        prop="buy_date"
        label="车辆购置日期"
        width="110"
      ></el-table-column>
      <el-table-column prop="check" label="是否年检"></el-table-column>
      <el-table-column
        prop="repair_date"
        label="安全设备维护日期"
        width="150"
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
  data() {
    return {
      addModalVisible: false, // 控制模态框可见性
      vehicle: {},
      vehicles: [],
      searchQuery: "", // 用户输入的搜索查询
      selectedKind: "", // 用户选择的分类
      selectedCheck: "",
      activeTab: "all",
    };
  },
  computed: {
    // 计算属性，根据 searchQuery 过滤 vehicles
    filteredVehicles() {
      if (!this.searchQuery && !this.selectedKind) {
        return this.vehicles; // 如果没有搜索查询和分类选择，返回所有文章
      }
      const lowerQuery = this.searchQuery.toLowerCase();
      return this.vehicles.filter((vehicle) => {
        return (
          !this.searchQuery || vehicle.kind.toLowerCase().includes(lowerQuery)
        );
      });
    },
  },
  methods: {
    // 点击添加打开车辆模态框
    showAddModal() {
      this.addModalVisible = true; // 默认开启
    },
    // 上传文章
    addVehicle() {
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
      const selectedKind = this.vehicle.kind;
      this.vehicle.kind = kindMapping[selectedKind] || selectedKind; // 进行映射，如果没有匹配则保留原值
      const selectedCheck = this.vehicle.check;
      this.vehicle.check = checkMapping[selectedCheck] || selectedCheck; // 进行映射，如果没有匹配则保留原值

      // 发送 POST 请求到后端，保存文章
      this.$http.post("vehicles", this.vehicle).then(() => {
        // 成功回调
        this.$message({
          title: "成功", // 消息标题
          message: "文章发布成功", // 消息内容
          type: "success", // 消息类型
        });
        // 关闭模态框
        this.addModalVisible = false;
        this.fetch();
      });
    },
    // fetch() {
    //   this.$http.get("vehicles").then((res) => {
    //     this.vehicles = res.data;
    //   });
    // },
    // 在 fetch 方法中处理返回的日期
    fetch() {
      this.$http.get("vehicles").then((res) => {
        this.vehicles = res.data.map((vehicle) => {
          // 使用 moment.js 格式化日期字段
          vehicle.buy_date = moment(vehicle.buy_date).format("YYYY-MM-DD");
          vehicle.repair_date = moment(vehicle.repair_date).format(
            "YYYY-MM-DD"
          );
          return vehicle;
        });
      });
    },
    read() {},
    edit(id) {
      this.$router.push(`/vehicles/${id}`); //点击编辑则跳转到文章编辑页
    },
    remove(id) {
      this.$http.delete(`vehicles/${id}`).then(() => {
        this.$message({
          message: "车辆删除成功",
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

<style scoped>
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
