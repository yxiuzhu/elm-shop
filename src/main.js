import Vue from 'vue'
import router from './router/index.js'
import App from './App.vue'

import './cube-ui'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
