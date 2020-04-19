export function eventListener(instance, event, callback, once = false) {
  if (!instance || !event || !callback) {
    console.log('缺少参数错误')
    return
  }
  let isDone = false
  const handler = function() {
    if (isDone) {
      return
    }
    isDone = true
    callback && callback()
  }
  if (once) {
    instance.$once(event, handler)
  } else {
    instance.$on(event, handler)
  }
}

export function isUrl(str) {
  return /(?:jpeg|jpg|png|gif|webp)/i.test(str)
}