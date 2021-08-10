import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import main from '@/pages/main/main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
    },
  ],
})
