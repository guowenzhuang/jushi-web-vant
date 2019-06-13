import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/main/home'
  },
  {
    path: '/login',
    name:'login',
    component: ()=> import('@/views/Login')
  },
    {
      path: '/main',
      name: 'main',
      component: () =>
        import('@/views/Main'),
      children: [
        {
          path: '/main/home',
          name: 'home',
          component: () =>
            import('@/views/Home')
        }, {
          path: '/main/plate',
          name: 'plate',
          component: () =>
            import('./views/Plate')
        }, {
          path: '/main/search',
          name: 'search',
          component: () =>
            import('./views/Search')
        }, {
          path: '/main/me',
          name: 'me',
          component: () =>
            import('./views/Me')
        },
        
      ]
    }

  ]
})
