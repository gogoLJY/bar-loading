import BarLoading from './main'
import { directive } from './directive'
import BarLoadingComponent from './component/barLoading.vue'

export {
  BarLoadingDirective,
  BarLoadingComponent,
}

export default {
  install(Vue) {
    Vue.directive('barLoading', directive)
    Vue.prototype.$barLoading = BarLoading
  }
}