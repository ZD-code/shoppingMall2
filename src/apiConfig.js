const BASEURL = 'https://www.easy-mock.com/mock/5b19eb8c966c7b5e64d9cb71/shoppingMall/';
const LOCALURL = 'http://localhost:3000/'
const URL = {
    getAll: BASEURL, //获取全部数据
    getShoppingMallInfo: BASEURL + 'index', //获取首页
    getGoodsInfo: BASEURL + 'getGoodsInfo', //获取商品列表
    registerUser: LOCALURL + 'user/register', //用户注册接口
    login: LOCALURL + 'user/login'
}
module.exports = URL;