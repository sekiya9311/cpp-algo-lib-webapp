import Vue from 'vue'
import Router from 'vue-router'
import SearchResults from '@/components/SearchResults'
import SourcePage from '@/components/SourcePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: SearchResults
    },
    {
        path: '/SourcePage',
        component: SourcePage
    }
  ]
})
