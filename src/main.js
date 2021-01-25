import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import request from './utils/request'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.axios = request;

// 配置默认ajax请求路径
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

//路由拦截器
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(m => m.meta.requireAuth)) {
    if (true) {
      console.log("123123")
      next();
    } else {
      // 非法访问
    }
  } else {
    next();
  }
});

import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  lazyComponent: true,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
