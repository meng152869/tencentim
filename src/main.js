import Vue from 'vue'
import App from './App.vue'
import tim from './tim'
import TIM from 'tim-js-sdk/tim-js-friendship.js'
import store from './store/index'
Vue.config.productionTip = false
window.tim = tim
window.TIM = TIM
window.store = store
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
new Vue({
  store:store,
  render: h => h(App),
}).$mount('#app')
