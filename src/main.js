import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false
// 创建axios请求实例，定义接口根地址
// Vue全局
import http from './http';
Vue.prototype.$http = http

new Vue({
  router,
  ElementUI,
  render: h => h(App),
}).$mount('#app')