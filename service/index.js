const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const { connect, initSchema } = require('./database/init');
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors'); //引入跨域模块
let user = require('./api/user'); //引入user.js模块
let goods = require('./api/goods')



let router = new Router();

router.use('/user', user.routes(), router.allowedMethods());
router.use('/goods', goods.routes(), router.allowedMethods());

app.use(cors())
app.use(bodyparser());

//加载路由中间件
app.use(router.routes(), router.allowedMethods());

(async() => {
    await connect(); //异步执行，需要等待完成    链接数据库
    initSchema(); //glob.sync同步引入的无需等待  将schema文件夹下的所有的  *.js 文件引入进来，创建User模版

    // const User = mongoose.model('User'); //使用创建好的User模版对象
    // let oneUser = new User({
    //     userName: 'test008',
    //     password: 'abc123'
    // });

    // //保存用户到数据库中
    // oneUser.save().then(() => {
    //     console.log('inserted success')

    // });

    //读出数据
    // let users = await User.findOne({}).exec();
    // console.log('==============')
    // console.log(users);
    // console.log('==============')


})();




app.use(async ctx => {
    ctx.body = 'hello koa'
});

app.listen(3000, () => {
    console.log('run success')
});