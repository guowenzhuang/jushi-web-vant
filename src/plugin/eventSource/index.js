import qs from 'qs'

let eventSource = (url, params, callFun, fun) => {
  let query = qs.stringify(params)
  let source = new EventSource(url + '?' + query, {
    withCredentials: true
  })
  source.onmessage = (event) => {
    let data = JSON.parse(event.data)
    // 没有数据的情况
    if (data.flag != null && data.flag === false) {
      source.close()
      if (_.isFunction(callFun)) {
        callFun(event)
      }
      return
    }

    fun(event, source)

  }
}

export default {
  install (Vue) {
    Vue.prototype.$eventSource = eventSource
  },
  eventSource
}
