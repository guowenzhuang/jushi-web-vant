export default {
  namespaced: true,
  state: {
    details: null
  },
  mutations: {
    setArticle (state, data) {
      state.details = data
    }
  },
  actions: {}
}
