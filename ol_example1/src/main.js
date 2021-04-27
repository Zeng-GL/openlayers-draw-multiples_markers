import Vue from 'vue'
import App from './App.vue'
import { PointGeom } from 'vuelayers'

Vue.config.productionTip = false

Vue.use(PointGeom)

new Vue({
  render: h => h(App),
}).$mount('#app')
