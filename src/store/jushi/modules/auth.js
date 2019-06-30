export default {
  namespaced: true,
  state: {
    token: {}
  },
  mutations: {
    login (state, data) {
      state.token = data
    }
  }
}
