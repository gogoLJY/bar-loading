import Vue from 'vue'
import App from './App.vue'
import BarLoading from '../src/main'

Vue.use(BarLoading)

new Vue({
  el: '#app',
  render: h => h(App)
})
