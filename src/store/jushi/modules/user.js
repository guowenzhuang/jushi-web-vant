export default {
  namespaced: true,
  state: {
    info: null
  },
  mutations: {
    setUserInfo (state, data) {
      state.info = data
    }
  },
  actions: {}
}
