import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const route =  new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import('./components/HomeComponent')
        },
        {
            path: '/list',
            name: 'list',
            component: () => import('./components/ListComponent')
        },
        {
            path: '/users/login',
            name: 'user.login',
            component: () => import('./components/User/Login')
        },
        {
            path: '/users/registration',
            name: 'user.registration',
            component: () => import('./components/User/Registration')
        },
        {
            path: '/fruits',
            name: 'fruits',
            component: () => import('./components/Fruit/FruitComponent')
        },
        {
            path: '*',
            component: () => import('./components/PageNotFound')

        }
    ]
})

route.beforeEach((to,from,next) => {
    const accessToken = localStorage.getItem('access_token')
    if(!accessToken) {
        if(to.name === 'user.login' || to.name === 'user.registration') {
               return next()
        } else {
            return next({
                name: 'user.login'
            })
        }
    }

    if(to.name === 'user.login' || to.name === 'user.registration' && accessToken) {
        return next({
            name: 'home'
        })
    }
    next()
})

export default route
