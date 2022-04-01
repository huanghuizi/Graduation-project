const utils = {
 /**
   * query组装(转换规则：将 Object key:value => key=value,且value不能为null '' undefined)
   * @param source {Object} 源query对象
   * @return {String} 目标query字符
   */
  queryEquipment(source) {
    if (typeof source === 'object') {
      let resultStr = '?'
      Object.keys(source).forEach(key => {
        //source[key]===0 是为了解决 值是0被过滤掉 的问题
        if (source[key]||source[key]===0)
          resultStr += `${key}=${source[key]}&`
      })
      return resultStr.substr(0, resultStr.length - 1)
    } else {
      throw new Error('queryEquipment source should be an object')
    }
  },
  /**
   * 函数防抖
   * @param fn {Function}   实际要执行的函数
   * @param delay  {Number} 延迟时间，单位是毫秒（ms）
   * @return {Function}
   */
   debounce(fn, delay) {
    // 维护一个 timer
    let timer = null
    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {
      // 保存函数调用时的上下文和参数，传递给 fn
      let context = this
      let args = arguments
      // 函数被调用，清除定时器
      if (timer) clearTimeout(timer)
      // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），再过 delay 毫秒就执行 fn
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  },

  /**
   * 深拷贝
   * @param source {Object} 源对象
   * @param target {Object} 目标对象
   * @return {Object} 目标对象
   */
  deepCopy(source, target) {
    target = target || {}
    for (let i in source) {
      if (source[i] === null) {
        target[i] = null
        continue
      }
      if (typeof source[i] === 'object') {
        target[i] = source[i].constructor === Array ? [] : {}
        this.deepCopy(source[i], target[i])
      } else {
        target[i] = source[i]
      }
    }
    return target
  }
}
  export default utils