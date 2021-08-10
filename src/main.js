import Vue from 'vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import ViewUI from 'view-design';
import locale from 'view-design/dist/locale/zh-CN';
Vue.use(ViewUI, { locale });

Vue.use(ElementUI);

Vue.prototype.rootHost = "https://www.bizzan.pro"; //BIZZAN
Vue.prototype.host = "https://api.bizzan.pro"; //BIZZAN

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
