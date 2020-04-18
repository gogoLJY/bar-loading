import BarLoading from './component/barLoading.vue'
import Vue from 'vue'
import {
  eventListener
} from './lib/utils'
import {
  defaultOpitons
} from './index'

const maskConstructor = Vue.extend(BarLoading)

let BarLoadingDirective = {}

maskConstructor.prototype.close = function() {
  eventListener(this, 'after-leave', () => {
    if(this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
    BarLoadingDirective = {}
  })
  this.visible = false
}

maskConstructor.prototype.complete = function() {
  eventListener(this, 'complete', () => {
    Vue.nextTick(() => {
      this.close()
    })
  })
  this.done && this.done()
}

function insertDom(parentNode, el) {
  parentNode.appendChild(el.loading)
  Vue.nextTick(() => {
    el.instance.visible = true
    el.instance.start && el.instance.start()
  })
}

function toggleLoading(el, options = {}, modifiers = {}) {
  const { show, fullscreen } = options

  if (show) {
    Vue.nextTick(() => {
      if (fullscreen || modifiers.fullscreen) {
        insertDom(document.body, el)
      } else {
        insertDom(el, el);
      }
    })
  } else {
    el.instance.complete()
  }
}

const bind = function (el, { value, modifiers }, vnode) {
  let options = Object.assign({}, defaultOpitons, value)

  let BarLoadingIntance = new maskConstructor({
    el: document.createElement('div'),
    data: options
  })
  el.instance = BarLoadingIntance
  el.loading = BarLoadingIntance.$el

  if (options.show) {
    toggleLoading(el, options, modifiers)
  }
}

const update = function(el, binding, vnode) {
  // el.instance.setText(el.getAttribute('element-loading-text'));
  const { value } = binding
  if (binding.oldValue.show !== value.show) {
    toggleLoading(el, binding);
  }
}

const unbind = function(el, binding, vnode) {
  if (el.domInserted) {
    el.loading &&
    el.loading.parentNode &&
    el.loading.parentNode.removeChild(el.loading);
    toggleLoading(el, { 
      value: {
        show: false
      },
      modifiers: binding.modifiers 
    });
  }
  el.instance && el.instance.$destroy()
}

export const directive = {
  bind,
  update,
  unbind
}