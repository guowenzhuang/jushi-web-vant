// vuex持久化存储
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    logout (state) {
      state.token = null
    },
    login (state, data) {
      state.token = data
    }
  }

}
