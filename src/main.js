import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import './style/reset.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuex from 'vuex' 

Vue.use(vuex)
Vue.use(ElementUI);
Vue.prototype.axios=axios 
Vue.prototype.$echarts = echarts 
Vue.use(iView);
Vue.use(VueAxios, axios);
Vue.prototype.qs = Qs;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");