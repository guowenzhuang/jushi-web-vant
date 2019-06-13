import { Base64 } from 'js-base64'
import Vue from 'vue'

// 加盐
let salting = Vue.prototype.salting

// 加密
const encryptString = (name) => {
  return Base64.encode(name + salting)
}

// 解密
const decodeString = (name) => {
  let decodeName = Base64.decode(name) || ''

  if (decodeName && decodeName.split && decodeName.split(salting) && decodeName.split(salting)[0]) {
    return decodeName.split(salting)[0]
  } else {
    return ''
  }
}

export default {
  install (Vue) {
    Vue.prototype.encryptString = encryptString
    Vue.prototype.decodeString = decodeString
  }
}
