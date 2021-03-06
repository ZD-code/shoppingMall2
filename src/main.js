// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Icon, Swipe, SwipeItem, Search, Lazyload, List, NavBar, Field, Tabs, Tab, Tabbar, TabbarItem, PullRefresh, Stepper } from 'vant'

Vue.config.productionTip = false
Vue.use(Button).use(Row).use(Col).use(Icon).use(Swipe).use(SwipeItem).use(Search).use(Lazyload).use(List).use(NavBar).use(Field).use(Tabs).use(Tab).use(Tabbar).use(TabbarItem).use(PullRefresh).use(Stepper)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})