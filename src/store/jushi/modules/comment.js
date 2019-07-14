export default {
  namespaced: true,
  state: {
    details: null
  },
  mutations: {
    setComment (state, data) {
      state.details = data
    }
  },
  actions: {}
}
