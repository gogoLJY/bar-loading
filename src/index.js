import BarLoading from './component/barLoading.vue'
import Vue from 'vue'
import { eventListener } from './lib/utils'

const BarLoadingConstructor = Vue.extend(BarLoading)

let BarLoadingInstance = null
const eventType = {
  start: 'start',
  done: 'done'
}

const defaultOpitons = {
  type: '',
  text: '正在加载中...',
  fullscreen: true,
  body: true, // 插入到body
  lock: false, // 是否锁定屏幕
  customClass: '' // 自定义类名
}

const eventTypeArr = [eventType.start, eventType.done]


BarLoadingConstructor.prototype.close = function() {
  eventListener(this, 'after-leave', () => {
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
  if (BarLoadingInstance) {
    if (options.type === eventType.done) {
      BarLoadingInstance.complete()
    }
  } else {
    options = Object.assign({}, defaultOpitons, options)
    let parent = options.body ? document.body : options.target

    BarLoadingInstance = new BarLoadingConstructor({
      data: options
    })

    BarLoadingInstance.$mount()
    parent.appendChild(BarLoadingInstance.$el)

    Vue.nextTick(() => {
      BarLoadingInstance.visible = true
      BarLoadingInstance.start && BarLoadingInstance.start()
    })
  }
}

eventTypeArr.forEach(type => {
  Loading[type] = function(options = {}) {
    options.type = type
    return Loading(options)
  }
})

export default Loading