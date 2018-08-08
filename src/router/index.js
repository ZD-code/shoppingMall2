/**
 * 前台路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/register'
import Login from '@/components/login'
import Goods from "@/components/goods"
import CategoryList from "@/components/categoryList";
import Cart from '@/components/Cart'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/goods',
        name: 'Goods',
        component: Goods
    }, {
        path: '/main',
        name: 'Main',
        component: Main,
        children: [{
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: '/categoryList',
                name: 'CategoryList',
                component: CategoryList
            }, {
                path: '/cart',
                name: 'Cart',
                component: Cart
            }
        ]
    }]
})