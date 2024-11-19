<template>
  <div id="app">
    <el-container
      v-if="isLayoutPage"
      style="height: 100vh; border: 1px solid #eee"
    >
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router unique-opened :default-active="$route.path">
          <!-- 首页 -->
          <div class="nanyuan">南苑车管</div>
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 基本信息 -->
          <el-submenu index="0">
            <template slot="title"
              ><i class="el-icon-menu"></i>基本信息</template
            >
            <el-menu-item index="/car">车辆信息</el-menu-item>
            <el-menu-item index="/driver">司机信息</el-menu-item>
            <el-menu-item index="/address">常用地址</el-menu-item>
            <el-menu-item index="/account">账号管理</el-menu-item>
          </el-submenu>
          <!-- 排班管理 -->
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-s-operation"></i>排班管理</template
            >
            <el-menu-item index="/financial">排班调度</el-menu-item>
            <el-menu-item index="/financial/add">班车管理</el-menu-item>
            <el-menu-item index="/financial/add">城市列表</el-menu-item>
            <el-menu-item index="/financial/add">通知管理</el-menu-item>
            <el-menu-item index="/financial/add">排班报表</el-menu-item>
            <el-menu-item index="/financial/add">班车报表</el-menu-item>
          </el-submenu>
          <!-- 车辆监控管理 -->
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-location-outline"></i>车辆监控管理</template
            >
            <el-menu-item index="/financial">定位/视频</el-menu-item>
            <el-menu-item index="/financial/add">路线规划</el-menu-item>
          </el-submenu>
          <!-- 财务管理 -->
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-guide"></i>财务管理</template
            >
            <el-menu-item index="/financial">财务结算</el-menu-item>
            <el-menu-item index="/financial/add">费用类型</el-menu-item>
            <el-menu-item index="/financial/add">费用审批</el-menu-item>
            <el-menu-item index="/financial/add">发票列表</el-menu-item>
            <el-menu-item index="/financial/add">财务报表</el-menu-item>
            <el-menu-item index="/financial/add">客户订单</el-menu-item>
          </el-submenu>
          <!-- 考勤管理 -->
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-time"></i>考勤维保</template
            >
            <el-menu-item index="/clock">考勤打卡</el-menu-item>
          </el-submenu>
          <!-- 公告管理 -->
          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-chat-dot-round"></i>公告发布</template
            >
            <el-menu-item index="/bulletin/message">短信模板列表</el-menu-item>
            <el-menu-item index="/bulletin/group">群发消息列表</el-menu-item>
            <el-menu-item index="/bulletin/add">群发App消息</el-menu-item>
            <el-menu-item index="/bulletin">群发公告</el-menu-item>
          </el-submenu>
          <!-- 帮助管理 -->
          <el-submenu index="6">
            <template slot="title"
              ><i class="el-icon-question"></i>帮助中心</template
            >
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 页面头部 -->
        <el-header style="text-align: right; font-size: 12px">
          <span>在线客服🎧</span>
          <span>消息</span>
          <span>张三</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-left: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <!-- 显示路由页面 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-if="!isLayoutPage"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return { users: "" };
  },
  computed: {
    isLayoutPage() {
      return this.$route.meta.layout !== "empty";
    },
  },
  created() {},
};
</script>

<style>
html body {
  margin: 0;
  padding: 0;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  background-color: #b3c0d1;
}
.nanyuan {
  display: flex; /* 使用Flexbox布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100px;
  background: #b3c0d1;
}
.el-header {
  color: #333;
  line-height: 60px;
}

.el-header span {
  margin-right: 20px;
}
.el-aside {
  color: #333;
}
</style>
