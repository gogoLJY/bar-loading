import BarLoading from './index'
import { directive } from './directive'


export const barLoading = directive

export default {
  install(Vue) {
    Vue.directive('barLoading', directive)
    Vue.prototype.$barLoading = BarLoading
  }
}