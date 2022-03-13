import Vue from 'vue';
import Element from 'main/index.js';
import App from './play/index.vue';
// import 'packages/theme-chalk/src/index.scss';
// 引入自定义样式
import 'packages/theme-chalk/index.css';
import 'packages/theme-lbx/src/index.scss';

Vue.use(Element);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
