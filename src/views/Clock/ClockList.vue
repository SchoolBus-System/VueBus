<template>
  <div>
    <div class="filters" style="margin-bottom: 20px">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        format="yyyy-MM-dd"
        placeholder="选择日期范围"
      />
      <el-button type="primary" @click="fetchData">查询</el-button>
      <el-button @click="switchToLastMonth">上月</el-button>
      <el-button @click="switchToCurrentMonth">本月</el-button>
    </div>

    <el-line-chart :data="chartData" style="height: 200px"></el-line-chart>

    <el-table :data="tableData" style="margin-top: 20px">
      <el-table-column prop="cardHolder" label="打卡人"></el-table-column>
      <el-table-column
        prop="cardHolderPhone"
        label="打卡人手机号码"
      ></el-table-column>
      <el-table-column prop="cardCount" label="打卡次数"></el-table-column>
      <el-table-column
        prop="effectiveTime"
        label="有效打卡时间"
      ></el-table-column>
      <el-table-column prop="cardCountTotal" label="打卡总数"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="viewDetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  name: "ClockList",
  components: {
    "el-line-chart": Line,
  },
  data() {
    return {
      dateRange: [],
      chartData: {
        labels: ["1月", "2月", "3月", "4月", "5月"],
        datasets: [
          {
            label: "数据集1",
            borderColor: "#42A5F5",
            backgroundColor: "rgba(66, 165, 245, 0.2)",
            data: [150, 200, 100, 170, 165],
          },
          {
            label: "数据集2",
            borderColor: "#66BB6A",
            backgroundColor: "rgba(102, 187, 106, 0.2)",
            data: [100, 120, 130, 180, 150],
          },
        ],
      },
      tableData: [
        {
          cardHolder: "张三",
          cardHolderPhone: "13800000001",
          cardCount: 5,
          effectiveTime: "00:30",
          cardCountTotal: 10,
        },
        // 添加更多数据
      ],
    };
  },
  methods: {
    fetchData() {
      // 请求数据逻辑
    },
    switchToLastMonth() {
      // 切换到上月的逻辑
    },
    switchToCurrentMonth() {
      // 切换到本月的逻辑
    },
    viewDetails(row) {
      // 在这里使用 row 参数，例如弹出详情：
      this.$message.info(`查看打卡人: ${row.cardHolder} 的详情`);
      // 或者可以使用其他逻辑来处理
    },
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  align-items: center;
}
</style>
