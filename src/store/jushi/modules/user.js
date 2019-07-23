export default {
  namespaced: true,
  state: {
    info: {
      likeArticles: [],
      likeComments: []
    }
  },
  mutations: {
    logout (state) {
      state.info = {
        likeArticles: [],
        likeComments: []
      }
    },
    /**
     * 修改用户头像
     * @param state
     * @param data
     */
    setUserImg (state, data) {
      state.info.imageUrl = data
    },
    /**
     * 设置用户信息
     * @param state
     * @param data
     */
    setUserInfo (state, data) {
      state.info = data
    },
    /**
     * 增加一条喜欢的文章
     * @param state
     * @param likeArticle
     */
    addLikeArticle (state, likeArticle) {
      if (state.info.likeArticles == null) {
        state.info.likeArticles = []
      }
      state.info.likeArticles.push(likeArticle)
    },
    /**
     * 减少一条喜欢的文章
     * @param state
     * @param likeArticle
     */
    removeLikeArticle (state, likeArticle) {
      state.info.likeArticles = state.info.likeArticles.filter(item => {
        return item.id !== likeArticle.id
      })
    },
    /**
     * 增加一条喜欢的评论
     * @param state
     * @param likeComment
     */
    addLikeComment (state, likeComment) {
      if (state.info.likeComments == null) {
        state.info.likeComments = []
      }
      state.info.likeComments.push(likeComment)
    },
    /**
     * 减少一条喜欢的评论
     * @param state
     * @param likeArticle
     */
    removeLikeComment (state, likeComment) {
      state.info.likeComments = state.info.likeComments.filter(item => {
        return item.id !== likeComment.id
      })
    },
  },
  actions: {}
}
