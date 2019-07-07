// vuex持久化存储
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    login (state, data) {
      state.token = data
    }
  }

}
