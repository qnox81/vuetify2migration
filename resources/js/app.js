/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap')

// window.Vue = require('vue')
import Vue from 'vue'
import vuetify from '~/plugins/vuetify' // path to vuetify export

import store from '~/store'
import router from '~/router'
import { i18n } from '~/plugins'
import App from '~/components/App'

// import '~/plugins'
import '~/components'

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  vuetify,
  ...App
  // render: h => h(App)
}).$mount('#app')

