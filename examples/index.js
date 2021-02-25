import Vue from 'vue'
import App from './App.vue'
import BarLoading from '../dist/bar-loading.min'
// import BarLoading from '../src'

Vue.use(BarLoading)

new Vue({
  el: '#app',
  render: h => h(App)
})
