// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/default.css'
import App from './App'
import router from './router'
import store from './vuex/store'

import VueHighlightJS from 'vue-highlightjs'

Vue.config.productionTip = false

Vue.use(VueHighlightJS)
Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
