import BarLoading from './index'

export default {
  install(Vue) {
    Vue.prototype.$barLoading = BarLoading
  }
}