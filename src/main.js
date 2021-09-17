import Vue from 'vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n';
import vueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css'
import storage from './utils/localStorage.js'
import store from './store/index.js'
import App from './App.vue'
import api from './config/api';
import './utils/drag.js';

import ViewUI from 'view-design';
import locale from 'view-design/dist/locale/zh-CN';

var moment = require('moment');
var momentTimezone = require('moment-timezone');

Vue.use(ViewUI, { locale });
Vue.use(vueResource);
Vue.use(VueI18n);
Vue.use(ElementUI);


Vue.prototype.$session = storage;
Vue.prototype.api = api;

Vue.config.productionTip = false;
Vue.prototype.moment = moment;
Vue.prototype.$axios = axios;

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
    'zh_CN': require('./assets/lang/cn.js'),
  },
  silentTranslationWarn: true
});

Vue.filter('timeFormat', function (tick) {
  return moment(tick).format("HH:mm:ss");
});

Vue.filter('dateFormat', function (tick) {
  return moment(tick).format("YYYY-MM-DD HH:mm:ss");
});

Vue.prototype.timeFormat = function (tick) {
  return momentTimezone(tick).tz(this.getTimezone4K()).format("HH:mm:ss");
};
Vue.prototype.dateFormat = function (tick) {
  return momentTimezone(tick).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm:ss");
};
Vue.prototype.dateFormatHM = function (tick) {
  return momentTimezone(tick).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm");
};
Vue.prototype.dateFormatFromString = function (tick) {
  var timestamp = momentTimezone(tick).tz('Asia/Shanghai').valueOf();
  return momentTimezone(timestamp).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm:ss");
};

Vue.filter('toPercent', function (point) {
  var str = Number(point * 100).toFixed(1);
  str += "%";
  return str;
});

Vue.filter('toFixed', function (number, scale) {
  return new Number(number).toFixed(scale);
});

function toFloor(number, scale = 8) {
  if (new Number(number) == 0) {
    return 0;
  }
  var __str = number + "";
  if (__str.indexOf('e') > -1 || __str.indexOf('E') > -1) {
    var __num = new Number(number).toFixed(scale + 1),
      __str = __num + "";
    return __str.substring(0, __str.length - 1);
  } else if (__str.indexOf(".") > -1) {
    if (scale == 0) {
      return __str.substring(0, __str.indexOf("."));
    }
    return __str.substring(0, __str.indexOf(".") + scale + 1);
  } else {
    return __str;
  }
}
Vue.filter('toFloor', (number, scale) => {
  return toFloor(number, scale);
});

Array.prototype.remove = function (index) {
  if (isNaN(index) || index > this.length) {
    return false;
  } else {
    for (var i = 0, n = 0; i < this.length; i++) {
      if (this[i] != this[index]) {
        this[n++] = this[i];
      }
    }
    this.length -= 1;
  }
};

Vue.prototype.toFloor = toFloor;
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
