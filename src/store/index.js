import Vue from 'vue'
import Vuex from 'vuex'

import modules from './jushi'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modules
  }
})
