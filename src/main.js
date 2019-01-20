import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'


import router from './router'
import store from './store'
import axios from 'axios';
import http from './api/http';
import utils from './utils/utils'
import Alert from './page/components/alert'

Vue.config.productionTip = false;
Vue.prototype.http = http;
Vue.prototype.$utils = utils;
Vue.prototype.$vue = new Vue;


Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload);
Vue.use(Alert);

Vue.use(VueLazyload, {
  error: './assets/images/loading.png',
  loading: './assets/images/loading.png',
  attempt: 1,
  lazyComponent: true
});


/* 路由发生变化修改页面title */
router.afterEach((to) => {
  let doc = document;
  doc.body.scrollTop = 0;
  doc.documentElement.scrollTop = 0;
  if (to.meta.title) {
    if (to.name === 'form') {
      switch (to.params.type) {
        case '0':
          doc.title = 'COI-' + '登录';
          break;
        case '1':
          doc.title = 'COI-' + '注册';
          break;
        case '2':
          doc.title = 'COI-' + '重置密码';
          break;
      }
    } else {
      doc.title = 'COI-' + to.meta.title;
    }
  }

  //个人中心是否登录状态
  if (to.fullPath.indexOf('/user/') !== -1) {
    if (!store.state.loginState) {
      // router.push('/form/0');
    }
  }
});


/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: {App},
  template: '<App/>'
});

export default app.$router;


