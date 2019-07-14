import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/main/home'
  },
    /**
     * 登录
     */
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    /**
     *  注册
     */
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register')
    },
    /**
     * spa页面
     */
    {
      path: '/main',
      name: 'main',
      component: () =>
        import('@/views/Main'),
      children: [
        /**
         * 首页
         */
        {
          path: '/main/home',
          name: 'home',
          component: () =>
            import('@/views/Home')
        },
        /**
         * 板块
         */
        {
          path: '/main/plate',
          name: 'plate',
          component: () =>
            import('./views/Plate')
        },
        /**
         * 搜索
         */
        {
          path: '/main/search',
          name: 'search',
          component: () =>
            import('./views/Search')
        },
        /**
         * 我的
         */
        {
          path: '/main/me',
          name: 'me',
          component: () =>
            import('./views/Me')
        }
      ]
    },
    /**
     * 文章详情
     */
    {
      path: '/article',
      name: 'article',
      component: () => import('@/views/ArticleDetails')
    },
    /**
     * 评论详情
     */
    {
      path: '/comment',
      name: 'comment',
      component: () => import('@/views/CommentDetails')
    },
    /**
     * 文章发表
     */
    {
      path: '/issueArticle',
      name: 'issueArticle',
      component: () => import('@/views/IssueArticle')
    }
  ]
})
