import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import main from '@/pages/main/main'
import swap from '@/pages/swap/swap'
import other from '@/pages/other/other'
import selfSwap from '@/components/swap/self_swap'

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
      children: [{
        path: '/main',
        name: 'SwapPair',
        component: swap,
        meta: {
          keepAlive: true,
        },
      }, {
        path: '/other/:pair',
        name: 'OtherPair',
        component: other,
        meta: {
          keepAlive: true,
        },
      }]
    }
  ],
})
