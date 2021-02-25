import BarLoading from './component/barLoading.vue'
import Vue from 'vue'
import { eventListener } from './lib/utils'
import { addClass, removeClass } from './lib/dom'

const BarLoadingConstructor = Vue.extend(BarLoading)

let BarLoadingInstance = null
const eventType = {
  show: 'show',
  done: 'done',
  hide: 'hide'
}

export const defaultOpitons = {
  type: '',
  text: '正在加载中...',
  fullscreen: true,
  body: true, // 插入到body
  lock: false, // 是否锁定屏幕
  customClass: '', // 自定义类名
  progressContainer: []
}

const eventTypeArr = [eventType.show, eventType.done, eventType.hide]

BarLoadingConstructor.prototype.close = function() {
  eventListener(this, 'after-leave', () => {
    const target = this.fullscreen || this.body
      ? document.body
      : this.target;
    removeClass(target, 'parent-no-scroll')

    if(this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
    BarLoadingInstance = null
  })
  this.visible = false
}

BarLoadingConstructor.prototype.complete = function() {
  eventListener(this, 'complete', () => {
    Vue.nextTick(() => {
      this.close()
    })
  })
  this.done && this.done()
}

const Loading = function(options) {
  if (options.type === eventType.hide) {
    BarLoadingInstance && BarLoadingInstance.close()
  } else if (options.type === eventType.done) {
    BarLoadingInstance && BarLoadingInstance.complete()
  } else {
    options = Object.assign({}, defaultOpitons, options)
    let parent = options.body ? document.body : options.target

    BarLoadingInstance = new BarLoadingConstructor({
      data: options
    })

    BarLoadingInstance.$mount()
    if (options.lock && options.fullscreen) {
      addClass(parent, 'parent-no-scroll')
    }
    parent.appendChild(BarLoadingInstance.$el)

    Vue.nextTick(() => {
      BarLoadingInstance.visible = true
      BarLoadingInstance.start && BarLoadingInstance.start()
    })
  }
}

eventTypeArr.forEach(type => {
  Loading[type] = (options = {}) =>{
    options.type = type
    return Loading(options)
  }
})

export { BarLoading }
export default Loading