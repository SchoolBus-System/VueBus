<template>
  <div class="route-creator">
    <el-row>
      <el-col :span="12">
        <!-- 地图容器 -->
        <div ref="mapContainer" style="width: 100%; height: 500px"></div>
      </el-col>
      <el-col :span="12">
        <!-- 路线表单 -->
        <el-form :model="routeForm" label-width="120px">
          <el-form-item label="路线名称">
            <el-input v-model="routeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="路线说明">
            <el-input v-model="routeForm.description"></el-input>
          </el-form-item>
          <el-form-item label="上学">
            <el-input v-model="routeForm.school"></el-input>
          </el-form-item>
          <el-form-item label="跟车老师">
            <el-input v-model="routeForm.teacher"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addRoute">添加路线</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeForm: {
        name: "",
        description: "",
        school: "",
        teacher: "",
      },
    };
  },
  methods: {
    addRoute() {
      console.log("添加路线:", this.routeForm);
    },
    async initMap() {
      const AMapLoader = await import("@amap/amap-jsapi-loader");
      AMapLoader.load({
        key: "6524bea42b7a4567446623f71124075c", // 替换为你的高德地图API Key
        version: "2.0", // 指定要加载的 JSAPI 的版本
      })
        .then((AMap) => {
          new AMap.Map(this.$refs.mapContainer, {
            zoom: 11,
            center: [116.397428, 39.90923],
          });
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

<style scoped>
.route-creator {
  padding: 20px;
}
</style>
