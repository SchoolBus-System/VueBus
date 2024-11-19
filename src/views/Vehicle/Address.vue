<template>
  <div>
    <!-- 头部 -->
    <div class="header-actions">
      <!-- 账号管理 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="常用站点" name="first"></el-tab-pane>
        <el-tab-pane label="监控站点" name="second"></el-tab-pane>
      </el-tabs>
      <!-- 添加和搜索部分 -->
      <div class="word-actions">
        <!-- 搜索 -->
        <div class="search-section">
          <input
            type="text"
            id="name"
            class="search-input"
            placeholder="请输入站点..."
          />
        </div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="showAddModal">添加站点</el-button>
        <el-button type="danger" @click="showAddModal">批量删除</el-button>
      </div>
    </div>
    <!-- 地图、内容 -->
    <div class="container">
      <!-- 地图容器 -->
      <div class="map-section">
        <div ref="mapContainer" style="width: 100%; height: 100%"></div>
      </div>
      <!-- 内容部分 -->
      <div class="table-section">
        <el-table :data="filteredWords">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="phrase" label="站点名称"></el-table-column>
          <el-table-column prop="licensePlate" label="地址"></el-table-column>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressInfo",
  data() {
    return {
      activeName: "first", // 默认激活的tab
      filteredWords: [], // 表格数据
      selectedSites: [], // 存储选中的站点信息
    };
  },
  methods: {
    addRoute() {
      console.log("添加路线:", this.routeForm);
    },
    handleMapClick(event) {
      // 获取点击的坐标
      const { lng, lat } = event.lnglat;
      // 创建新的站点数据
      const newSite = {
        phrase: `站点${this.filteredWords.length + 1}`, // 示例站点名称
        licensePlate: `地址(${lng}, ${lat})`, // 示例地址
        _id: Date.now(), // 使用时间戳作为站点的唯一标识符
      };
      // 将新站点添加到表格数据中
      this.filteredWords.push(newSite);
    },
    async initMap() {
      const AMapLoader = await import("@amap/amap-jsapi-loader");
      AMapLoader.load({
        key: "49e3f1322119cd10dfb716d650000ed9", // 替换为你的高德地图API Key
        version: "2.0", // 指定要加载的 JSAPI 的版本
      })
        .then((AMap) => {
          const map = new AMap.Map(this.$refs.mapContainer, {
            zoom: 11,
            center: [116.397428, 39.90923],
          });
          // 添加点击事件
          map.on("click", this.handleMapClick);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
  height: 500px; /* 保证容器有高度，以适应地图显示 */
}

.map-section {
  width: 60%; /* 设置地图部分宽度，这样可以使其更大 */
  height: 100%; /* 使地图容器高度为100% */
}

.table-section {
  width: 40%; /* 设置表格宽度 */
  height: 100%; /* 表格高度设置为100% */
  overflow-y: auto; /* 添加滚动条 */
  padding: 10px; /* 添加内边距 */
}
</style>
