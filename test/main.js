import Vue from 'vue'
import weather from '../src/components/weather.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(weather),
}).$mount('#app')
