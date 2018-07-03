import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from '@/components/MainContainer'
import DailyList1 from '@/components/DailyList1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainContainer',
      component: MainContainer
    },
    {
      path: '/dailylist1',
      name: 'DailyList1',
      component: DailyList1
    }
  ]
})
