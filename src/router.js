import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: () =>
            import('@/views/Home')
    }, {
        path: '/plate',
        name: 'plate',
        component: () =>
            import('./views/Plate')
    }, {
        path: '/search',
        name: 'search',
        component: () =>
            import('./views/Search')
    }, {
        path: '/me',
        name: 'me',
        component: () =>
            import('./views/Me')
    }

    ]
})
