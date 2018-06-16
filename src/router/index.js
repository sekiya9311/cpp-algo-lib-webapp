import Vue from 'vue'
import Router from 'vue-router'
import SearchResults from '@/components/SearchResults'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: SearchResults
    }
  ]
})
