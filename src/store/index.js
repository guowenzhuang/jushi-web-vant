import Vue from 'vue'
import Vuex from 'vuex'

import modules from './jushi'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modules
  },
  plugins: [createVuexAlong({
    name: 'jushi'
  })]

})
