/**
 * 后台路由配置文件
 */
const BASEURL = 'https://www.easy-mock.com/mock/5b19eb8c966c7b5e64d9cb71/shoppingMall/'; //easy-mock 数据
const LOCALURL = 'http://localhost:3000/' //本地数据库数据
const URL = {
    getAll: BASEURL, //获取全部数据
    getShoppingMallInfo: BASEURL + 'index', //获取首页
    getGoodsInfo: BASEURL + 'getGoodsInfo', //获取商品列表
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
    registerUser: LOCALURL + 'user/register', //用户注册接口
    login: LOCALURL + 'user/login',
    getCategoryList: LOCALURL + 'goods/getCategoryList',
    getCategorySubList: LOCALURL + 'goods/getCategorySubList'
}
module.exports = URL;