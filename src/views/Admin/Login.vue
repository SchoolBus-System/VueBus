<template>
  <div class="login-container" role="main">
    <div class="login-box">
      <form @submit.prevent="handleLogin" novalidate>
        <h3>欢迎登录</h3>
        <div class="form-group">
          <input
            type="text"
            v-model="username"
            placeholder="请输入账号"
            required
            aria-required="true"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="password"
            placeholder="请输入密码"
            required
            aria-required="true"
          />
        </div>
        <div class="form-group">
          <input type="checkbox" id="remember" v-model="rememberMe" />
          <label for="remember">记住密码</label>
          <a href="#" class="forgot-password">忘记密码</a>
        </div>
        <button type="submit" class="login-button">登 录</button>
        <div class="register-link">
          <a href="#">注册账号</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    handleLogin() {
      // 在这里处理登录逻辑
      console.log("登录信息:", this.username, this.password, this.rememberMe);
      // 可以在这里添加表单验证逻辑
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器占满整个视口高度 */
  margin: 0;
  background-color: #f7f7f7; /* 背景颜色 */
}

.login-box {
  width: 100%;
  max-width: 400px; /* 最大宽度 */
  padding: 40px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #007bff;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.forgot-password,
.register-link a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password {
  float: right;
}

.register-link {
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .login-box {
    padding: 20px;
  }
}
</style>
