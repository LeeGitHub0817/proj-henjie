import Vue from 'vue'
import App from './App.vue'
import router from './router'



//引入公共组件
import HeadPart from './components/HeadPart';
import FootPart from './components/FootPart';
//声明公共组件
Vue.component('head-part', HeadPart);
Vue.component('foot-part', FootPart);

// //引入公共样式
// import "./assets/css/common.css";
// import "./assets/css/mycss.css";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
