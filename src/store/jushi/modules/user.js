export default {
  namespaced: true,
  state: {
    info: {}
  },
  mutations: {
    setUserInfo (state, data) {
      state.info = data
    }
  },
  actions: {}
}
