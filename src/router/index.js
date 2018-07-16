/**
 * 前台路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/register'
import Login from '@/components/login'
import Goods from "@/components/goods"
import categoryList from "@/components/categoryList";

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
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
        path: '/categoryList',
        name: categoryList,
        component: categoryList
    }]
})