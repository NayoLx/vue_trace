import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import vueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css'
import store from './store/index.js'
import VueI18n from "vue-i18n";
import App from './App.vue'
import api from './config/api';

import ViewUI from 'view-design';
import locale from 'view-design/dist/locale/zh-CN';

var moment = require('moment');
var momentTimezone = require('moment-timezone');

Vue.use(ViewUI, { locale });
Vue.use(VueI18n);
Vue.use(vueResource);
Vue.use(ElementUI);

Vue.prototype.rootHost = "https://www.bizzan.pro"; //BIZZAN
Vue.prototype.host = "https://api.bizzan.pro"; //BIZZAN
Vue.prototype.api = api;

Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type': 'application/json;charset=utf-8'
};

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages: {
      'zh_CN': require('./assets/lang/cn.js'),
      'en_US': require('./assets/lang/en.js'),
      'zh_HK': require('./assets/lang/hk.js'),
  },
  silentTranslationWarn: true
});

Vue.filter('timeFormat', function(tick) {
  return moment(tick).format("HH:mm:ss");
});

Vue.filter('dateFormat', function(tick) {
  return moment(tick).format("YYYY-MM-DD HH:mm:ss");
});

Vue.prototype.getTimezone4K = function(){
  var curlang = this.$store.getters.lang;
  if(curlang=="en_US"){
    return "America/Los_Angeles";
  }
  if(curlang=="ja_JP"){
    return "Asia/Tokyo";
  }
  if(curlang=="ko_KR"){
    return "Asia/Seoul";
  }
  if(curlang=="de_DE"){
    return "Europe/Berlin";
  }
  if(curlang=="fr_FR"){
    return "Europe/Paris";
  }
  if(curlang=="it_IT"){
    return "Europe/Rome";
  }
  if(curlang=="es_ES"){
    return "Europe/Madrid";
  }
  if(curlang=="zh_HK"){
    return "Asia/Hong_Kong";
  }
  if(curlang=="zh_CN"){
    return "Asia/Shanghai";
  }
  return curlang;
};
Vue.prototype.getLang4K = function(){
  var curlang = this.$store.getters.lang;
  if(curlang=="en_US"){
    return "en";
  }
  if(curlang=="ja_JP"){
    return "ja";
  }
  if(curlang=="ko_KR"){
    return "ko";
  }
  if(curlang=="de_DE"){
    return "de_DE";
  }
  if(curlang=="fr_FR"){
    return "fr";
  }
  if(curlang=="it_IT"){
    return "it";
  }
  if(curlang=="es_ES"){
    return "es";
  }
  if(curlang=="zh_HK"){
    return "zh_TW";
  }
  if(curlang=="zh_CN"){
    return "zh";
  }
  return curlang;
};
Vue.prototype.timeFormat=function(tick) {
    return momentTimezone(tick).tz(this.getTimezone4K()).format("HH:mm:ss");
  };
Vue.prototype.dateFormat=function(tick) {
    return momentTimezone(tick).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm:ss");
  };
Vue.prototype.dateFormatHM=function(tick) {
    return momentTimezone(tick).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm");
  };
Vue.prototype.dateFormatFromString=function(tick){
var timestamp = momentTimezone(tick).tz('Asia/Shanghai').valueOf();
return momentTimezone(timestamp).tz(this.getTimezone4K()).format("YYYY-MM-DD HH:mm:ss");
};

Vue.filter('toPercent', function(point) {
  var str = Number(point * 100).toFixed(1);
  str += "%";
  return str;
});

Vue.filter('toFixed', function(number, scale) {
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

Vue.prototype.toFloor = toFloor;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
